import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

import { api } from "@/services/api";

import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { Categories, CategoriesProps } from "@/components/categories";

type MarketsProps = PlaceProps

export default function Home() {
    const [categories, SetCategories] = useState<CategoriesProps>([])
    const [category, SetCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories() {
        try {
        const { data } = await api.get("/categories")
        SetCategories(data)
        SetCategory(data[0].id)
        } catch (error) {
          console.log(error)  
          Alert.alert("Categorias", "Não foi possível carregar as categorias.")
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                return
            }

            const {data} = await api.get("markets/category/" + category)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert("Locais", "Não foi possível carregar os locais.")
        }
    }
    // useEffect para categorias criadas
    useEffect(() => {
        fetchCategories()
    }, [])

    // useEffect para locais criados
    useEffect(() => {
        fetchMarkets()
    }, [category])

    return  <View 
    style={{ flex: 1, backgroundColor: "#CECECE" }}>
        <Categories 
        data={categories} 
        onSelect={SetCategory} 
        selected={category}
        />

        <Places data={markets} />
    </View>
}
