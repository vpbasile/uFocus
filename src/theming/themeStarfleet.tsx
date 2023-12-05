import { ThemeConfig, extendTheme, withDefaultColorScheme, withDefaultVariant } from '@chakra-ui/react'

// Define your color mode config
const colorModeConfig: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}

// extend the theme
const uFocusTheme = extendTheme({
    styles: {
        global: (props:{colorMode:string}) => ({
            body: {
                bg: props.colorMode === "dark" ? "gray.800" : "gray.300",
            },
        }),
    },
    fonts: {
        heading: `'Okuda', monospace`,
        body: `'SandBoxBodyFont', monospace`,
    }
    , colors: {
        starfleet: {
            command: "#330000",
            operations: "#332700",
            science: "#002833",
            indeterminite: "#161a16",
            gold: "#c8ab37ff"
        },
    },
},
    withDefaultColorScheme({ colorScheme: 'gray', components: ['Button'], })
    , withDefaultVariant({ variant: 'outline', components: ['Button'] })
    , colorModeConfig
)

export default uFocusTheme