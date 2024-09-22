import {Button, Grid2, Skeleton, Stack, Typography} from "@mui/material";
import * as React from "react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useCategories} from "@/app/contexts/CategoriesContext";
import {FormTextField} from "@/app/components/forms/base/FormTextField";
import {FormDropdown} from "@/app/components/forms/base/FormDropdown";
import {useTasks} from "@/app/contexts/TasksContext";
import {TaskStatus} from "@/app/interfaces/TaskStatus";
import {enqueueSnackbar} from "notistack";

export default function CreateTaskForm() {
  const {categories, loading: categoryLoading} = useCategories();
  const {createTask} = useTasks();

  const methods = useForm({
    resolver: yupResolver<FieldValues>(yup.object().shape({
      description: yup.string().required("The description is required"),
      category: yup.string().required("The description is required"),
    })),
    mode: "onChange",
  })

  function handleSubmit() {
    console.log("Valid")
    methods.handleSubmit(async (data) => {
      console.log("data")
      console.log(data)
      await createTask({
        id: "",
        description: data.description,
        category: {
          id: data.category,
          name: "",
          userId: "",
        },
        status: TaskStatus.NOT_STARTED,
        duration: 0
      })
      console.log("Saved")

    }, (errors) => enqueueSnackbar("Erro", {variant: 'error'}))()
  }

  return (
      <FormProvider {...methods}>
        <Stack>
          <Typography variant="h4">Create task</Typography>
        </Stack>
        <Stack>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <FormTextField
                  label={"Description"}
                  name={"description"}
              />
            </Grid2>
            <Grid2 size={12}>
              {
                categoryLoading ? <Skeleton variant="rectangular" /> :
                    <FormDropdown
                        label={"Category"}
                        name={"category"}
                        options={categories ? categories.map(category => ({
                          value: category.id,
                          label: category.name
                        })) : []}
                    />
              }

            </Grid2>
            <Grid2 size={4}>
              <Button variant="contained" color="primary" fullWidth>
                <Typography>Back</Typography>
              </Button>
            </Grid2>
            <Grid2 size={4}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                <Typography>Create</Typography>
              </Button>
            </Grid2>
            <Grid2 size={4}>
              <Button variant="contained" color="primary" fullWidth>
                <Typography>Create and start</Typography>
              </Button>
            </Grid2>
          </Grid2>
        </Stack>
      </FormProvider>
  )
}