<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { loginUser } from "@/services";
import { router } from "@/router";
import jwt_decode from "jwt-decode";
import { getAuthStore } from "@/stores";

const schema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
});

async function onSubmit(values, { setErrors }) {
  const { email, password } = values;

  try {
    const { token } = await loginUser(email, password);

    const decodedToken = jwt_decode(token);
    const authStore = getAuthStore();
    await authStore.saveUser(token, decodedToken);

    return router.push("/");
  } catch (error) {
    setErrors({ apiError: error });
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group field">
        <label>Email</label>
        <Field
          name="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
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
          Login
        </button>
      </div>
      <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">
        {{ errors.apiError }}
      </div>
    </Form>
    <span>Doesn't have an account? <router-link to="/register">Register</router-link></span>
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
