import { useUpdateItem } from "@/hooks/CRUD/useUpdateItem";
import { type FormInput } from "../types";



export function useAdminEditorForm(
  input: FormInput,
  setInput: React.Dispatch<React.SetStateAction<FormInput>>,
  setShown: React.Dispatch<React.SetStateAction<boolean>>
) {
  const updateItem = useUpdateItem(input.item, input.type);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setInput((prev) => ({
      ...prev,
      item: {
        ...prev.item,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return {
    handleSave,
    handleChange,
  };
}
