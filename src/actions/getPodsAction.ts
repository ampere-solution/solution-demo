"use server";

import * as k8s from '@kubernetes/client-node';


const initiateK8sApi = () => {
  const kc = new k8s.KubeConfig();
  kc.loadFromFile("/var/snap/microk8s/7518/credentials/client.config");

  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  return k8sApi;
}

export const getPodsAction = async (namespace = "default") => {
  const k8sApi = initiateK8sApi();

  try {
    const res = await k8sApi.listNamespacedPod({namespace});
    return res.items;
  } catch (err) {
    console.error("pods fetching error", err);
  }
}

export const getPodLogs = async (podName = "", podNamespace = "", containerName = "") => {
  const k8sApi = initiateK8sApi();

  const payload = {
    name: podName, namespace: podNamespace,
  }

  if(containerName.length > 0){
    //eslint-disable-next-line
    //@ts-expect-error
    payload.container = containerName;
  }

  try {
    const podLogs = await k8sApi.readNamespacedPodLog(payload);
    return podLogs;
  } catch (err) {
    console.error("pods logs fetching error", err);
  }
}


