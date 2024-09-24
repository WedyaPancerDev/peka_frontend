import * as yup from "yup";
import { useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";
import PageContainer from "components/Container/PageContainer";

import { getCustomStyle } from "utils/react-select";
import { authRegister, RegisterPayload } from "services/auth";
import { ReactSelectOption } from "types";
import { roleList } from "utils/constant";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const formSchema = yup.object().shape({
  role: yup
    .mixed()
    .test(
      "role-not-empty",
      "Role wajib diisi",
      (value) => value !== "" && !!value
    )
    .required("Role wajib diisi"),
  fullname: yup
    .string()
    .required("Nama Lengkap harus diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(255, "Nama maksimal 255 karakter")
    .matches(/^[ a-zA-Z]+$/, "Nama lengkap hanya boleh berisi huruf"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(8, "Password minimal 8 karakter")
    .max(50, "Password maksimal 50 karakter"),
  confirm_password: yup
    .string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([yup.ref("password")], "Konfirmasi password tidak sesuai"),
  phone: yup
    .string()
    .required("No telepon harus diisi")
    .matches(
      /^0\d{9,14}$/,
      "Format nomor telepon harus dimulai dengan 0 dan memiliki panjang antara 10 hingga 15 karakter"
    )
    .min(10, "Minimal 10 karakter")
    .max(15, "Maksimal 15 karakter"),
});

const TambahPengguna = (): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      role: "",
      fullname: "",
      password: "",
      confirm_password: "",
      phone: "",
    },
    resolver: yupResolver(formSchema),
  });

  const form = watch();

  const clearForm = (): void => {
    setValue("fullname", "");
    setValue("password", "");
    setValue("confirm_password", "");
    setValue("phone", "");
  };

  const getPayload = (): RegisterPayload => {
    return {
      fullname: form.fullname,
      password: form.password,
      phone: form.phone,
    };
  };

  const onSubmit = async () => {
    const payload = getPayload();
    const { role: roleForm } = getValues();

    const role = (roleForm as unknown as ReactSelectOption).value;

    try {
      setIsSubmitting(true);

      const result = await authRegister(payload, role);

      if (result.success) {
        toast.success("Berhasil menambahkan pengguna baru");

        clearForm();
        setIsSubmitting(false);
        queryClient.refetchQueries({ queryKey: ["users-key"] });
        navigate("/manajemen-pengguna", { replace: true });

        return;
      }

      toast.error("Oops, Gagal menambahkan pengguna. Coba beberapa saat lagi");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      toast.error("Oops, Terjadi kesalahan. Coba beberapa saat lagi");
    }
  };

  return (
    <PageContainer
      title="Tambah Pengguna - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
      description="#"
    >
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: lgUp ? "800px" : "100%",
          marginBottom: "2rem",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={1}
          >
            Tambah Pengguna Baru
          </Typography>

          <Box
            component="form"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
            marginTop="2rem"
          >
            <Controller
              name="role"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="role">
                      Pilih Role Pengguna
                    </CustomFormLabel>

                    <Select<ReactSelectOption>
                      {...(field as any)}
                      inputId="role"
                      classNamePrefix="select"
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      options={roleList || []}
                      isDisabled={isSubmitting}
                      placeholder="Pilih Role Pengguna"
                      styles={getCustomStyle(error)}
                    />

                    {error && (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="red"
                      >
                        {error.message}
                      </Typography>
                    )}
                  </Box>
                );
              }}
            />

            <Controller
              name="fullname"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="fullname">
                      Masukan Nama Lengkap
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      id="fullname"
                      placeholder="contoh: Kukuh Budi Darmawan"
                      disabled={isSubmitting}
                      type="text"
                    />

                    {error && (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="red"
                      >
                        {error.message}
                      </Typography>
                    )}
                  </Box>
                );
              }}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="password">
                      Masukan Password
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      autoComplete="new-password"
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      endAdornment={
                        <IconButton
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? (
                            <IconEyeOff size={24} color="#9ca3af" />
                          ) : (
                            <IconEye size={24} color="#9ca3af" />
                          )}
                        </IconButton>
                      }
                      id="password"
                      placeholder="****"
                      disabled={isSubmitting}
                      type={showPassword ? "text" : "password"}
                    />

                    {error ? (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="red"
                      >
                        {error.message}
                      </Typography>
                    ) : (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="gray"
                      >
                        Kata sandi minimal 8 karakter
                      </Typography>
                    )}
                  </Box>
                );
              }}
            />

            <Controller
              name="confirm_password"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="confirm_password">
                      Masukan Konfirmasi Password
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      autoComplete="new-password"
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      endAdornment={
                        <IconButton
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? (
                            <IconEyeOff size={24} color="#9ca3af" />
                          ) : (
                            <IconEye size={24} color="#9ca3af" />
                          )}
                        </IconButton>
                      }
                      id="confirm_password"
                      placeholder="****"
                      disabled={isSubmitting}
                      type={showPassword ? "text" : "password"}
                    />

                    {error ? (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="red"
                      >
                        {error.message}
                      </Typography>
                    ) : (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="gray"
                      >
                        Konfirmasi kata sandi minimal 8 karakter
                      </Typography>
                    )}
                  </Box>
                );
              }}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="phone">
                      Masukan Nomor Telepon
                    </CustomFormLabel>
                    <CustomTextField
                      {...field}
                      fullWidth
                      type="text"
                      id="phone"
                      error={!!error}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (!/[^0-9]/.test(value)) {
                          field.onChange(value.replace(/[^0-9]/, ""));
                        }
                      }}
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      autoComplete="phone"
                      disabled={isSubmitting}
                      placeholder="Contoh: 089777888333"
                    />

                    {error && (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="red"
                        paddingTop="10px"
                      >
                        {error.message}
                      </Typography>
                    )}
                  </Box>
                );
              }}
            />

            <Box
              marginTop={3}
              gap="12px"
              display="grid"
              gridTemplateColumns="1fr"
            >
              <Button
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menambahkan..." : "Tambah Pengguna Baru"}
              </Button>
              <Button
                fullWidth
                size="large"
                type="button"
                color="inherit"
                variant="text"
                disabled={isSubmitting}
                onClick={() => {
                  navigate("/manajemen-pengguna", { replace: true });
                }}
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                Kembali
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default TambahPengguna;
