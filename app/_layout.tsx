import { Stack, usePathname } from "expo-router";
import { Image } from "react-native";
import React, { useMemo } from "react";

export default function Layout() {
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/index";

    const screenOptions = useMemo(() => {
        interface HeaderOptions {
            headerTitle: string;
            headerLeft?: (props: any) => React.ReactElement | undefined;
            headerBackVisible: boolean;
            headerShown?: boolean;
        }

        return {
            headerShown: isHomePage ? true : false,
            headerTitle: "JDIET Exam Buddy",
            headerLeft: isHomePage ?
            (props: any): React.ReactElement => <Image source={require('../assets/images/jditimage.png')} /> : undefined,
            headerBackVisible: !isHomePage,
        } satisfies HeaderOptions;
    }, [isHomePage]);

    return (
        <Stack screenOptions={screenOptions}/>
    );
}