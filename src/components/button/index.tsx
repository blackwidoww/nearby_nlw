import { 
    TouchableOpacity, 
    TouchableOpacityProps, 
    Text, 
    TextProps,
    ActivityIndicator, 
} from "react-native"
import { IconProps as TablerIconProps } from "@tabler/icons-react-native"

import { styles } from "./styles"
import { colors } from "@/styles/theme"

// Button
type ButtonProps = TouchableOpacityProps & { 
    isLoading?: boolean
}

function Button({children, style, isLoading = false, ...rest }: ButtonProps){
    return (
    <TouchableOpacity 
        style={[styles.container, style]} 
        activeOpacity={0.8} 
        disabled={isLoading}
        {...rest}
        >
        { isLoading ? (
            <ActivityIndicator size="small" color={colors.gray[100]}/>
         ) : (
            children 
        )} 
    </TouchableOpacity>
    )
}

// Title
function Title({children}: TextProps){
    return <Text 
    style={styles.title}>
        {children}
    </Text>
}

// Icon
type IconProps = { 
    icon: React.ComponentType<TablerIconProps>
}

function Icon({ icon: Icon }: IconProps) {
    return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }