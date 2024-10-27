import {Button, Grid2, Stack, Typography} from "@mui/material";
import * as React from "react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FormTextField} from "@/app/components/forms/base/FormTextField";
import {enqueueSnackbar} from "notistack";
import {FormMultivalueTextField} from "@/app/components/forms/base/FormMultivalueTextField";
import {useProjects} from "@/app/contexts/ProjectsContext";

export default function CreateProjectForm() {
  const {createProject} = useProjects();

  const methods = useForm({
    resolver: yupResolver<FieldValues>(yup.object().shape({
      name: yup.string().required("The name is required"),
      managers: yup.array().of(yup.string().email("Type a valid email")),
      members: yup.array().of(yup.string().email("Type a valid email")),
    })),
    mode: "onSubmit",
  })

  function handleSubmit() {
    methods.handleSubmit(async (data) => {
      console.log("Valid")
      await createProject({
        name: data.name,
        managers: data.managers,
        members: data.members
      })
    }, (errors) => enqueueSnackbar(errors.root?.message, {variant: 'error'}))()
  }


  return (
      <FormProvider {...methods}>
        <Stack>
          <Typography variant="h4">Create project</Typography>
        </Stack>
        <Stack>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <FormTextField
                  label={"Project name"}
                  name={"name"}
                  type={"text"}
              />
            </Grid2>
            <Grid2 size={12}>
              <FormMultivalueTextField
                  schema={yup.string().email("Type a valid email").required("The email is required")}
                  name={"managers"}
                  label={"Project managers"}
                  type={"text"}
                  placeholder={"For each email, separate by enter"}
              />
            </Grid2>

            <Grid2 size={12}>
              <FormMultivalueTextField
                  schema={yup.string().required("The email is required")}
                  name={"members"}
                  label={"Project members"}
                  type={"text"}
                  placeholder={"For each email, separate by enter"}
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