'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import {FormTextField} from "@/_components/input/FormTextField";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {FieldValues, FormProvider, useForm} from "react-hook-form"
import {createNewTask} from "@/services/createNewTask";
import {useRouter} from "next/navigation";


export const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
})

export function CreateTaskForm(): React.JSX.Element {
  const router = useRouter()

  const methods = useForm({
    resolver: yupResolver<FieldValues>(schema),
    mode: "onChange",
  })

  function handleSubmit() {
    methods.handleSubmit(
        async (data) => {
          console.log(data)
          await createNewTask(data)
          router.push("/tasks")
        },
        (errors) => console.log(errors),
    )()
  }

  return (
      <FormProvider {...methods}>
        <form>
          <Card>
            <CardHeader title="New Task"/>
            <Divider/>
            <CardContent>
              <Stack spacing={3} sx={{maxWidth: 'sm'}}>
                <FormTextField
                    label="Description"
                    name={"description"}
                    type="text"
                />
                <FormTextField
                    label="Category"
                    name={"category"}
                    type="text"
                />
              </Stack>
            </CardContent>
            <Divider/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
              <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </CardActions>
          </Card>
        </form>
      </FormProvider>
  );
}
