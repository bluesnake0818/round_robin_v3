import { useState } from "react"

const useForm = () => {
  const [value, setValue] = useState("")

  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  return { value, onValueChange }
}

export default useForm
