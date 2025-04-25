import React, {useEffect, useRef, useState} from "react";
import {Box, Text} from "@chakra-ui/react";
import {APP_WITH_NAMESPACES, WEBSITE_MIGRATION} from "@/constants/common";
import {TApps} from "@/types/common";

// Debounce function (as defined above)
/* eslint-disable  @typescript-eslint/no-explicit-any */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      // @ts-expect-error: this binding
      func.apply(this, args);
    }, delay);
  };
}

const getLogs = async (podName: string, podNameSpace: string, containerName: string = "") => {
  if (podName && podNameSpace) {
    try {
      const podLogs = await fetch("/api/getPodLogs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          podName: podName,
          namespace: podNameSpace,
          containerName: containerName
        }),
      });
      const logData = await podLogs?.json();

      return logData;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new Error("Error while fetching logs");
    }
  }
  return null;
}

const Logs = ({activeTabId, tab}: {
  activeTabId: TApps;
  tab: string;
}) => {
  const [logs, setLogs] = useState("");
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const podDataRef = useRef<any>(null);
  const [isFetchingPods, setIsFetchingPods] = useState<boolean>(false);
  const logsContainerRef = useRef(null);

  useEffect(() => {
    const fetchPods = async (namespace: string) => {
      setIsFetchingPods(true);
      try {
        const podResponse = await fetch('/api/getPods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ namespace }),
        });

        const podsData = await podResponse?.json();
        podDataRef.current = podsData; // Store pod data in ref
      } catch (error) {
        console.error('Error fetching pods', error);
        setLogs('Error while fetching logs...');
        podDataRef.current = null;
      } finally {
        setIsFetchingPods(false);
      }
    };

    if (
      tab === activeTabId &&
      tab !== WEBSITE_MIGRATION &&
      activeTabId !== WEBSITE_MIGRATION
    ) {
      const namespace = APP_WITH_NAMESPACES[activeTabId];
      if (namespace) {
        fetchPods(namespace);
        setLogs('Loading Logs...'); // Initial loading message
      } else {
        setLogs('Error while fetching logs...');
        podDataRef.current = null;
      }
    } else {
      podDataRef.current = null; // Clear pod data when tab is inactive
    }
    // Cleanup: Clear the pod data when the component unmounts or tab changes
    return () => {
      podDataRef.current = null;
    };
  }, [activeTabId, tab]);

  // useEffect to start/stop the interval based on podData and active tab
  useEffect(() => {
    let logsIntervalTimer: string | number | NodeJS.Timeout | undefined;
     // Define debouncedGetLogs inside the useEffect
    const debouncedGetLogs = debounce(
      async (podName: string, namespace: string, containerName: string) => {
        try {
          const logData = await getLogs(podName, namespace, containerName);
          if (logData?.length > 0) {
            setLogs(logData);
          } else {
            setLogs('No logs found');
          }
        } catch (error) {
          console.error('Error fetching logs within debounce', error);
          setLogs('Error while fetching logs...');
        }
      },
      1000, // Adjust debounce time as needed
    );

    if (
      tab === activeTabId &&
      tab !== WEBSITE_MIGRATION &&
      activeTabId !== WEBSITE_MIGRATION &&
      podDataRef.current &&
      !isFetchingPods // only start the interval if pod data is available and not currently fetching
    ) {
      const containerName = podDataRef.current[0]?.spec?.containers?.[0]?.name;
      const podName = podDataRef.current[0]?.metadata?.name;
      const podNamespace = podDataRef.current[0]?.metadata?.namespace;

      if (podName && podNamespace && containerName) {
        logsIntervalTimer = setInterval(() => {
          debouncedGetLogs(podName, podNamespace, containerName);
        }, 5000);
      } else {
        setLogs('Error: Could not retrieve pod details.');
      }
    }

    return () => {
      clearInterval(logsIntervalTimer);
    };
  }, [activeTabId, tab, isFetchingPods]); // Remove debouncedGetLogs from dependencies


  useEffect(() => {
    if (logsContainerRef.current) {
      // eslint-disable-next-line
      //@ts-ignore
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logsContainerRef, logs])

  console.log("logs", logs);

  return (
    <Box background={"#F1F1F1"} maxHeight={"calc(100vh - 122px)"} overflowY={"scroll"} padding={"20px"}
         ref={logsContainerRef}>
      {logs.split("\n").map((singleLog, index) => {
        return (
          <Text key={index} marginBlock={"10px"}>
            {singleLog}
          </Text>
        )
      })}
    </Box>
  )
}

export default Logs;
