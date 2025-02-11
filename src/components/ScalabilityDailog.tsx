import React from 'react'
import {Box} from "@chakra-ui/react";
import Image from "next/image";

import Dailog from "@/components/ui/Dailog";
import {Button} from "@/components/ui/button";
import {SCALABILITY_IMAGES} from "@/constants/common";

const DailogBody = ({activeTabId}: { activeTabId: string | null }) => {
  if (!activeTabId || !SCALABILITY_IMAGES[activeTabId]) {
    return <>No Image found</>
  }

  return (
    <>
      <Image src={SCALABILITY_IMAGES[activeTabId]} alt={activeTabId} width={800}
             height={800} onError={() => <>adf</>}/>
    </>
  )
}

const ScalabilityDailog = ({isOpen, setIsOpen, activeTabId}: {
                             isOpen: boolean,
                             setIsOpen: (isOpen: boolean) => void,
                             activeTabId: string | null
                           }
) => {
  return (
    <Dailog isOpen={isOpen} onClose={() => setIsOpen(false)}
            title={<Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} gap={"10px"}>
              <Button onClick={() => setIsOpen(false)} size={"sm"} style={{
                background: "none",
                color: "gray",
                boxShadow: "none",
              }}>X</Button></Box>}
            body={<DailogBody activeTabId={activeTabId}/>}/>
  )
}
export default ScalabilityDailog
