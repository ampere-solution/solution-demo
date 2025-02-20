"use client";

import React, {useState} from "react";
import {Box, Container, Tabs, useTabs} from "@chakra-ui/react";

import HeaderComponent from "@/app/HeaderComponent";
import Logs from "@/components/Logs";
import {
    DEFAULT_APP_WEB_MIGRATION,
    GRAFANA_IFRAME_LINKS,
    TABS_TO_DISPLAY, WEBSITE_MIGRATION,
    WORDPRESS,
} from "@/constants/common";
import {TWebMigrationApps} from "@/types/common";

const MainView = ({tab, iframeRefreshCount, selectedWebMigrationApp, migrationLogs, isMigrationCompleted}: {
    tab: {
        id: string;
        title: string;
        iframeUrl: string | null,
        component?: React.ComponentType
        shouldShowLogs?: boolean
    }
    iframeRefreshCount: number
    selectedWebMigrationApp?: TWebMigrationApps;
    migrationLogs?: string[];
    isMigrationCompleted: boolean;
}) => {
    const {component: Component} = tab;
    if (tab.iframeUrl) {
        return <Box key={iframeRefreshCount} gridColumn={tab.shouldShowLogs ? "" : "span 5"}>
            <iframe src={tab.iframeUrl} width={"100%"} height={"100%"}/>
        </Box>
    }

    if (Component) {
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
       //@ts-expect-error
        return <Component selectedWebMigrationApp={selectedWebMigrationApp || WORDPRESS}
                          migrationLogs={migrationLogs} isMigrationCompleted={isMigrationCompleted}/>;
    }

    return <></>;
}

export default function Home() {
    const tabs = useTabs({
        defaultValue: TABS_TO_DISPLAY[0].id
    });
    const [iframeRefreshCount, setIframeRefreshCount] = useState(0);
    const [selectedApp, setSelectedApp] = useState<TWebMigrationApps>(DEFAULT_APP_WEB_MIGRATION);
    const [migrationLogs, setMigrationLogs] = useState(["Loading Logs..."]);
    const [isMigrationCompleted, setIsMigrationCompleted] = useState(false);

    const handleUpdateMigrationLogs = (log: string, migrationCompletedStatus = false) => {
        setMigrationLogs((prev) => [...prev, log]);
        setIsMigrationCompleted(migrationCompletedStatus);

        setTimeout(() => {
            setIsMigrationCompleted(false);
        }, 3000)
    }

    const handleAppSelect = (appName: TWebMigrationApps) => {
        setSelectedApp(appName);
    }

    const handleRefreshIframe = () => {
        let refreshCount = 0;
        const intervalId = setInterval(() => {
            refreshCount++;
            if (refreshCount >= 10) {
                clearInterval(intervalId);
            }
            setIframeRefreshCount((prev) => prev + 1);
        }, 3000);
    }

    return (
        <Container>
            <Box>
                <Tabs.RootProvider variant="plain" value={tabs} pb={"22px"}>
                    <Tabs.List bg={"#4E4E4E"} w={"100%"}>
                        {
                            TABS_TO_DISPLAY.map((tab) => {
                                return (
                                    <Tabs.Trigger
                                        key={tab.id}
                                        value={tab.id}
                                        py={"22px"}
                                        borderY={"7px solid transparent"}
                                        borderBottomColor="transparent"
                                        _selected={{borderBottomColor: "red"}}
                                        color={"white"}
                                        fontSize={14}
                                        w={{base: "100%", md: "fit-content"}}
                                        h={"fit-content"}
                                        cursor={"pointer"}
                                        borderRadius={"0"}
                                    >
                                        {tab.title}
                                    </Tabs.Trigger>
                                )
                            })
                        }
                    </Tabs.List>
                    {TABS_TO_DISPLAY.map((tab) => {
                        return (
                            <Tabs.Content key={tab.id} value={tab.id}
                            >
                                <Box marginBottom={"20px"}>
                                    <HeaderComponent
                                        currentTab={tab}
                                        activeTabId={tabs.value}
                                        handleRefreshIframe={handleRefreshIframe}
                                        selectedApp={selectedApp}
                                        handleAppSelect={handleAppSelect}
                                        handleUpdateMigrationLogs={handleUpdateMigrationLogs}
                                    />
                                </Box>
                                <Box display={"grid"} gridTemplateColumns={"4fr 1fr"} gap={"20px"}
                                     height={"calc(100vh - 172px)"}>
                                    <MainView tab={tab} selectedWebMigrationApp={selectedApp}
                                              iframeRefreshCount={iframeRefreshCount} migrationLogs={migrationLogs} isMigrationCompleted={isMigrationCompleted}/>
                                    {tab.shouldShowLogs && tab.id !== WEBSITE_MIGRATION ? (
                                        // eslint-disable-next-line
                                        // @ts-ignore
                                        <Logs tab={tab.id} activeTabId={tabs.value.toString()}/>
                                    ) : null}
                                </Box>
                                {/*eslint-disable-next-line*/}
                                {/*@ts-ignore*/}
                                {GRAFANA_IFRAME_LINKS[tabs.value || "DEFAULT"] ? (
                                    <Box marginBlock={"20px"} display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                                        {/*eslint-disable-next-line*/}
                                        {/*@ts-ignore*/}
                                        {GRAFANA_IFRAME_LINKS[tabs.value || "DEFAULT"].map((iframeUrl, index) => {
                                            return (
                                                <iframe
                                                    // eslint-disable-next-line
                                                    // @ts-ignore
                                                    key={index}
                                                    src={iframeUrl}
                                                    width="100%" height="300" frameBorder="0"></iframe>
                                            )
                                        })}

                                    </Box>) : null}
                            </Tabs.Content>
                        )
                    })}
                </Tabs.RootProvider>
            </Box>
        </Container>
    );
}
