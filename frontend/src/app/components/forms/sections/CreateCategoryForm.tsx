import {Button, Grid2, Stack, Typography} from "@mui/material";
import * as React from "react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useCategories} from "@/app/contexts/CategoriesContext";
import {FormTextField} from "@/app/components/forms/base/FormTextField";
import {enqueueSnackbar} from "notistack";

export default function CreateCategoryForm() {
  const {createCategory} = useCategories();

  const methods = useForm({
    resolver: yupResolver<FieldValues>(yup.object().shape({
      name: yup.string().required("The name is required"),
    })),
    mode: "onChange",
  })

  function handleSubmit() {
    methods.handleSubmit(async (data) => {
      console.log("Valid")
      await createCategory({
        name: data.name,
        userId: "",
        id: "",
      })
    }, (errors) => enqueueSnackbar("Erro", {variant: 'error'}))()
  }


  return (
      <FormProvider {...methods}>
        <Stack>
          <Typography variant="h4">Create category</Typography>
        </Stack>
        <Stack>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <FormTextField
                  label={"Name"}
                  name={"name"}
              />
            </Grid2>
            <Grid2 size={6}>
              <Button variant="contained" color="primary" fullWidth>
                <Typography>Back</Typography>
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                <Typography>Create</Typography>
              </Button>
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>
  )
}