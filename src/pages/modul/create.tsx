import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";
import PageContainer from "components/Container/PageContainer";

import { createModule, ModulePayload } from "services/modul";
import { uploadFile, UploadFileResponse } from "services/upload";
import { AppState, useSelector } from "store/Store";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
);

const formSchema = yup.object().shape({
  title: yup
    .string()
    .required("Nama Lengkap harus diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(60, "Nama maksimal 255 karakter"),
  description: yup
    .string()
    .required("Deskripsi harus diisi")
    .min(80, "Deskripsi minimal 80 karakter"),
  banner: yup
    .array()
    .min(1, "File is required")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return;

      return value?.length > 0 && value[0].size <= 3000000;
    }),
  embed_video: yup.string().min(11, "Link video minimal 11 karakter"),
});

const TambahPengguna = (): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { profile } = useSelector((state: AppState) => state.dashboard);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      banner: [],
      description: "",
      embed_video: "",
      title: "",
    },
    resolver: yupResolver(formSchema),
  });

  const form = watch();

  const clearForm = (): void => {
    setValue("banner", []);
    setValue("title", "");
    setValue("description", "");
    setValue("embed_video", "");
  };

  const fetchUploadFile = async () => {
    const formData = new FormData();
    const images = form.banner;

    if (!images?.length) {
      toast.error("File is required");

      return null;
    }

    try {
      formData.append("file", images[0] as File);
      const res = await uploadFile(formData, "product");

      if (res.success) {
        const { url } = res.data as UploadFileResponse;
        return url;
      }

      toast.error(res.message ?? "Oops, Gagal mengunggah file");
      return null;
    } catch (error) {
      toast.error("Oops, Terjadi kesalahan saat mengunggah file");
      return null;
    }
  };

  const getPayload = (
    additionalPayload: Pick<ModulePayload, "banner">
  ): ModulePayload => {
    return {
      description: form.description,
      embed_video: form.embed_video as string,
      title: form.title,
      created_by: profile?.id as string,
      ...additionalPayload,
    };
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const url = await fetchUploadFile();
      const payload = getPayload({ banner: url ?? "" });

      const result = await createModule(payload);

      if (result.success) {
        toast.success("Berhasil menambahkan modul pembelajaran baru.");

        clearForm();
        setIsSubmitting(false);
        queryClient.refetchQueries({ queryKey: ["modules-key"] });
        navigate("/modul-materi", { replace: true });

        return;
      }

      toast.error("Oops, Gagal menambahkan modul. Coba beberapa saat lagi");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      toast.error("Oops, Terjadi kesalahan. Coba beberapa saat lagi");
    }
  };

  return (
    <PageContainer
      title="Tambah Modul - Yayasan Pemberdayaan Perempuan Kepala Keluarga PEKKA"
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
            Tambah Modul Pembelajaran Baru
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
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="title">
                      Masukan Judul Modul
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      id="title"
                      placeholder="contoh: Modul Pembelajaran"
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
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="description">
                      Deskripsi Produk
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      type="text"
                      id="description"
                      error={!!error}
                      sx={{ fontWeight: 600 }}
                      multiline
                      rows={6}
                      placeholder='Contoh: "Modul pembelajaran ini berisi materi tentang..."'
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
              name="banner"
              control={control}
              render={({ field }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="banner">
                      Banner Modul Pembelajaran
                    </CustomFormLabel>

                    <FilePond
                      name="file"
                      disabled={isSubmitting}
                      acceptedFileTypes={[
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ]}
                      files={field.value as unknown as File[]}
                      onupdatefiles={(fileItems) =>
                        field.onChange(
                          fileItems.map((fileItem) => fileItem.file) as File[]
                        )
                      }
                      labelIdle="Upload gambar banner. Max 3 MB"
                      credits={false}
                      maxFileSize="3MB"
                    />
                  </Box>
                );
              }}
            />

            <Controller
              name="embed_video"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="embed_video">
                      Masukan Link Video Pembelajaran
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      id="embed_video"
                      placeholder="contoh: https://www.youtube.com/watch?v=..."
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
                {isSubmitting ? "Menambahkan..." : "Tambah Modul Baru"}
              </Button>
              <Button
                fullWidth
                size="large"
                type="button"
                color="inherit"
                variant="text"
                disabled={isSubmitting}
                onClick={() => {
                  navigate("/modul-materi", { replace: true });
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
