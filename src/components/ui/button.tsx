import type {ButtonProps as ChakraButtonProps} from "@chakra-ui/react"
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from "@chakra-ui/react"
import * as React from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {loading, disabled, loadingText, children, style, ...rest} = props
    return (
      <ChakraButton disabled={loading || disabled} ref={ref} style={{
        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
        borderRadius: "45px",
        padding: "6px 16px",
        background: "white",
        color: "red",
        textAlign: "center",
        cursor: "pointer",
        ...style
      }} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit"/>
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit"/>
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    )
  },
)
