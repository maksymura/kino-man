<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { registerUser } from "@/services";
import { router } from "@/router";

const schema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  name: Yup.string().required("name is required"),
  password: Yup.string().required("password is required"),
});

async function onSubmit(values, { setErrors }) {
  const { email, name, password } = values;
  try {
    await registerUser(email, name, password);

    console.log('here');

    return router.push("/login");
  } catch (error) {
    setErrors({ apiError: error });
  }
}
</script>

<template>
  <div>
    <h2>Register</h2>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group field">
        <label>email</label>
        <Field
          name="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="form-group field">
        <label>name</label>
        <Field
          name="name"
          type="name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
        />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="form-group field">
        <label>Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary max" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Register
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
        {{ errors.apiError }}
      </div>
    </Form>
    <span>Already have an account?  <router-link to="/login">Login</router-link></span>
  </div>
</template>

<style>
.field {
  margin-bottom: 15px;
}

.max {
  padding: 10px 50px;
  margin-bottom: 15px;
}
</style>
