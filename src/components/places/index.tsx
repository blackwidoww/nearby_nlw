import { Text, useWindowDimensions } from "react-native";
import { useRef } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"

import { Place, PlaceProps } from "../place";
import { mayInitWithUrlAsync } from "expo-web-browser";
import { styles } from "./styles";


type Props = {
    data: PlaceProps[]
}

export function Places({ data }: Props) {
    const dimensions = useWindowDimensions()
    const BottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = {
        min: 278,
        max: dimensions.height - 128
    }
    return (
    <BottomSheet
    ref={BottomSheetRef}
    snapPoints={[snapPoints.min, snapPoints.max]}
    handleIndicatorStyle = {styles.indicator}
    backgroundStyle = {styles.container}
    enableOverDrag = {false}
    >
        <BottomSheetFlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
            <Text style={styles.title}>Explore locais perto de você.</Text>
        )}
        showsVerticalScrollIndicator = {false}
        />
    </BottomSheet>
    )
}