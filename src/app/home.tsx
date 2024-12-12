import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

import { api } from "@/services/api";

import { Categories, CategoriesProps } from "@/components/categories";

export default function Home() {
    const [categories, SetCategories] = useState<CategoriesProps>([])
    const [category, SetCategory] = useState("")

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

    useEffect(() => {
        fetchCategories()
    }, [])

    return  <View 
    style={{ flex: 1 }}>
        <Categories 
        data={categories} 
        onSelect={SetCategory} 
        selected={category}
        />
    </View>
}
