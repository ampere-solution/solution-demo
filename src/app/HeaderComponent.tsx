"use client";

import React, {useState} from 'react'
import {Box, Heading, HStack, Separator, Text} from "@chakra-ui/react";

import {Button} from "@/components/ui/button";
import {PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger} from "@/components/ui/popover";

import {
  ARM,
  CICD,
  MEDIAWIKI, POD_NAMES, WEB_MIGRATION_APPS,
  WEBSITE_INFO,
  WEBSITE_MIGRATION,
  WORDPRESS, X86,
} from "@/constants/common";
import ScalabilityDailog from "@/components/ScalabilityDailog";
import {RadioGroup, Radio} from "@/components/ui/radio";
import {TArchTypes, TWebMigrationApps} from "@/types/common";

const X86_TO_ARM = "X86_TO_ARM";
const ARM_TO_X86 = "ARM_TO_X86";

type TButtonState = {X86_TO_ARM: {text: string; isLoading: boolean; isDisabled: boolean}, ARM_TO_X86: {text: string; isLoading: boolean; isDisabled: boolean;}};

    const BUTTONS_STATE = {
  [X86_TO_ARM]: {text: "Migrate to ARM", isLoading: false, isDisabled: false},
  [ARM_TO_X86]: {text: "Migrate to X86", isLoading: false, isDisabled: false},
}

const getPodDetails = async (app: TWebMigrationApps, arch: TArchTypes, podAppName: string) => {
  const podNamespace = WEB_MIGRATION_APPS[app][arch].namespace;
  try {
    const podResponse = await fetch("/api/getPods", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({namespace: podNamespace}),
    });
    const podsData = await podResponse?.json();

    if (podsData && podsData.length > 0) {
      const pod = podsData.filter((pod: {
        metadata: { labels: { app: string; }; };
      }) => pod.metadata.labels.app === podAppName);
      const podName = pod[0].metadata.name;
      return {podName, podNamespace};
    }
    return {podName:null, podNamespace:null};
  }
  catch (e: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    throw new Error("Something went wrong:", e?.message);
  }
}
const handleBenchmark = () => {};
const handleMigration = async (selectedApp: TWebMigrationApps, fromNode: TArchTypes, toNode: TArchTypes, buttonState: TButtonState, setButtonState: (state: TButtonState) => void, buttonId: "X86_TO_ARM" | "ARM_TO_X86", handleUpdateMigrationLogs: (log: string, migrationCompletedStatus?: boolean) => void) => {
    setButtonState({...buttonState, [buttonId]: {...buttonState[buttonId], isLoading: true, disabled: true}});
    handleUpdateMigrationLogs("Migration Started", false);
    handleUpdateMigrationLogs("Started taking mysql dump");
    // first take dump from fromNode
    try{
      const {podName, podNamespace} = await getPodDetails(selectedApp, fromNode,  POD_NAMES.MYSQL);

      const dumpResponse = await fetch('/api/mysqlDump', {
        method: "POST",
        body:JSON.stringify({ podName, namespace: podNamespace, database: selectedApp })
      });

      if(dumpResponse.status === 200) {
        console.log("dump completed filename:", dumpResponse.body);
        const data = await dumpResponse.json();
        console.log("response when dump completed", data.message);
        handleUpdateMigrationLogs("Database Dump Completed...");

        // restore backup to toNode
        handleUpdateMigrationLogs("Database restoration started");
        //sql pod details
        const {podName: podNameAtToNode, podNamespace: podNamespaceAtToNode} = await getPodDetails(selectedApp, toNode,  POD_NAMES.MYSQL);
        // wordpress pod details
        const {podName: wordpressPodName} = await getPodDetails(selectedApp, toNode, POD_NAMES.WORDPRESS);

        const restoreResponse = await fetch("/api/mysqlRestore", {
          method: "POST",
          body: JSON.stringify({podName: podNameAtToNode, namespace: podNamespaceAtToNode, database: selectedApp, wordpressPodName})
        });

        if (restoreResponse.status === 200) {
          console.log("restore completed filename:", restoreResponse.body);
          const data = await restoreResponse.json();
          console.log("response when restore complete", data.message);
          handleUpdateMigrationLogs("Database restoration done", true);
        }
      }
      setButtonState({...buttonState, [buttonId]: {...buttonState[buttonId], isLoading: false, disabled: false}});
    }
  catch (e: unknown) {
    throw new Error("Something went wrong");
    console.log('error :', e)
  }
};

async function triggerGithubAction(handleRefreshIframe: () => void) {
  const owner = 'ampere-solution';
  const repo = 'llvm-project';
  const token = process.env.GITHUB_TOKEN;
  const workflows = ['llvm-github-cicd.yml', 'llvm-github-cicd-oke.yml'];

  try {
    for (const workflow_id of workflows) {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: 'main' // the branch, trigger the workflow on
        })
      });

      if (!response.ok) {
        console.error(`Error triggering workflow ${workflow_id}:`, response.statusText);
      }
    }

    alert('Workflows triggered successfully!');
    handleRefreshIframe();
  } catch (error) {
    console.error('Error:', error);
  }
}

async function cancelGithubAction(handleRefreshIframe : () => void) {
  alert('Cancelling all running workflows...');

  const owner = 'ampere-solution';
  const repo = 'llvm-project';
  const token = process.env.GITHUB_TOKEN;

  try {
    // Step 1: List the currently running workflows
    const runsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs`, {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!runsResponse.ok) {
      throw new Error('Error fetching workflow runs: ' + runsResponse.statusText);
    }

    const runsData = await runsResponse.json();
    const runningRuns = runsData.workflow_runs.filter((run: { status: string; }) => run.status === 'in_progress');

    if (runningRuns.length === 0) {
      alert('No running workflows found to cancel.');
      return;
    }

    // Step 2: Cancel all running workflow runs
    for (const run of runningRuns) {
      const cancelResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs/${run.id}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!cancelResponse.ok) {
        console.error(`Error cancelling workflow run ${run.id}:`, cancelResponse.statusText);
      }
    }

    alert('All running workflows cancelled successfully!');
    handleRefreshIframe();
  } catch (error) {
    console.error('Error:', error);
    // eslint-disable-next-line
    // @ts-ignore
    alert('Error cancelling the workflows: ' + error.message);
  }
}

const WebMigrationHeader = ({defaultValue, handleAppSelect, handleUpdateMigrationLogs}: {defaultValue: TWebMigrationApps, handleAppSelect: (appName: TWebMigrationApps) => void, handleUpdateMigrationLogs: (log: string, migrationCompletedStatus?: boolean) => void}) => {

  const [buttonState, setButtonState] = useState(BUTTONS_STATE);

  return (
      <Box>
        <Heading size={"md"} marginBottom={"10px"}>Migrate</Heading>
        <RadioGroup defaultValue={defaultValue} paddingY={"10px"}>
          <HStack gap="6">
            <Radio value={WORDPRESS} onClick={() => handleAppSelect(WORDPRESS)}>Wordpress</Radio>
            <Radio value={MEDIAWIKI} onClick={() => handleAppSelect(MEDIAWIKI)}>Mediawiki</Radio>
          </HStack>
        </RadioGroup>
        <Button
            size={"sm"}
            onClick={async () => await handleMigration(defaultValue, X86, ARM, buttonState, setButtonState, X86_TO_ARM, handleUpdateMigrationLogs)}
            disabled={buttonState[X86_TO_ARM].isDisabled}
        >{buttonState[X86_TO_ARM].isLoading ? "Migrating..." : BUTTONS_STATE.X86_TO_ARM.text}</Button>
        <Button
            size={"sm"}
            onClick={async () => await handleMigration(defaultValue, ARM, X86, buttonState, setButtonState, ARM_TO_X86, handleUpdateMigrationLogs)}
            disabled={buttonState[ARM_TO_X86].isDisabled}
        >{buttonState[ARM_TO_X86].isLoading ? "Migrating..." : BUTTONS_STATE.ARM_TO_X86.text}</Button>
      </Box>
  )
};

const HeaderComponent = ({currentTab, activeTabId, handleRefreshIframe, selectedApp, handleAppSelect, handleUpdateMigrationLogs}: {
  currentTab: { id: string; title: string; iframeUrl: string | null, shouldShowLogs: boolean },
  activeTabId: string | null;
  handleRefreshIframe: () => void;
  selectedApp: TWebMigrationApps;
  handleAppSelect: (appName: TWebMigrationApps) => void;
  handleUpdateMigrationLogs: (log: string, migrationCompletedStatus?: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverContent = WEBSITE_INFO[currentTab.id];

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent={activeTabId === CICD || WEBSITE_MIGRATION ? "space-between" : "flex-end"} gap={"10px"}>
        <Box>
        {activeTabId === CICD ? (
            <Box>
              <Button size={"sm"} style={{
                boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
                borderRadius: "45px",
                padding: "6px 32px",
                background: "red",
                color: "white",
                textAlign: "center",
                cursor: "pointer",
                marginRight: "10px"
              }} onClick={ () => triggerGithubAction(handleRefreshIframe)}>Start Run</Button>
              <Button size={"sm"} onClick={()=>cancelGithubAction(handleRefreshIframe)}>Cancel</Button>
            </Box>
        ) :  null}
        {activeTabId === WEBSITE_MIGRATION ? (
            <WebMigrationHeader defaultValue={selectedApp} handleAppSelect={handleAppSelect} handleUpdateMigrationLogs={handleUpdateMigrationLogs} />
        ) : null}
        </Box>
        <Box>
        {activeTabId === WEBSITE_MIGRATION ? (<PopoverRoot>
          <PopoverTrigger asChild>
            <Button size={"sm"} style={{
              boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
              borderRadius: "45px",
              padding: "6px 32px",
              background: "red",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
              marginRight: "10px"
            }}>Procedure</Button>
          </PopoverTrigger>
          <PopoverContent maxHeight={"500px"} overflowY={"scroll"}>
            <PopoverBody>
              <Text fontWeight={"bold"}>
                Procedure
              </Text>
              <Text fontWeight={"bold"} color={"red"}>
                Subtitle goes here
              </Text>
              <Box my={"10px"}>
                <Text>description goes here</Text>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>) : null}
          {activeTabId === CICD ?
              ( <Button size={"sm"} style={{
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
            borderRadius: "45px",
            padding: "6px 32px",
            background: "red",
            color: "white",
            textAlign: "center",
            cursor: "pointer",
                marginRight: "10px"
          }} onClick={handleBenchmark}>Benchmark</Button> )
              : ( <Button size={"sm"} style={{
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
            borderRadius: "45px",
            padding: "6px 32px",
            background: "red",
            color: "white",
            textAlign: "center",
            cursor: "pointer",
                marginRight: "10px"
          }} onClick={() => setIsOpen(true)}>Scalability</Button> )}

        <PopoverRoot>
          <PopoverTrigger asChild>
            <Button size={"sm"}>Advantages</Button>
          </PopoverTrigger>
          <PopoverContent maxHeight={"500px"} overflowY={"scroll"}>
            <PopoverBody>
              <Text fontWeight={"bold"}>
                {popoverContent.title}
              </Text>
              <Text fontWeight={"bold"} color={"red"}>
                {popoverContent.subtitle}
              </Text>
              <Text fontWeight={"bold"} my={"10px"}>Annual rack-level evaluation</Text>
              {popoverContent.stats.map((stat: { icon: string; value: string; description: string }, index: number) => {
                return (
                  <Box my={"10px"} key={index}>
                    <Text color={"red"} fontWeight={"bold"}>{stat.icon + " " + stat.value}</Text>
                    <Text>{stat.description}</Text>
                  </Box>
                )
              })}
              <Text color={"gray"} fontStyle="italic">{popoverContent.note}</Text>
              <Separator/>
              <Heading size={"md"} my={"10px"}>
                Customer Values
              </Heading>
              <Text>{popoverContent.benefits.convincing}</Text>
              <Heading size={"md"} my={"10px"}>
                How does it show?
              </Heading>
              <Text>{popoverContent.benefits.how}</Text>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
        </Box>
      </Box>
      <ScalabilityDailog isOpen={isOpen} setIsOpen={setIsOpen} activeTabId={activeTabId}/>
    </>
  )
}
export default HeaderComponent
