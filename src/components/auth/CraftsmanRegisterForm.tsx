"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Wrench, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  registerCraftsmanSchema,
  type RegisterCraftsmanInput,
} from "@/lib/validations/auth";
import { DISTRICTS } from "@/lib/constants";
import { trpc } from "@/lib/trpc";
import { TaxPlateUpload } from "./TaxPlateUpload";

export function CraftsmanRegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoriesQuery = trpc.category.list.useQuery();

  const registerMutation = trpc.auth.registerCraftsman.useMutation({
    onSuccess: () => {
      router.push("/dogrulama");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const form = useForm<RegisterCraftsmanInput>({
    resolver: zodResolver(registerCraftsmanSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      taxNumber: "",
      description: "",
      district: "",
      address: "",
      categoryIds: [],
      kvkkConsent: false as unknown as true,
    },
  });

  function onSubmit(data: RegisterCraftsmanInput) {
    setError(null);
    registerMutation.mutate(data);
  }

  const categories = categoriesQuery.data ?? [];

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Wrench className="h-6 w-6 text-brand-secondary" />
          Usta Kaydı
        </CardTitle>
        <CardDescription>
          Usta olarak kayıt olun, müşterilerinize kolayca ulaşın
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Kişisel Bilgiler */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                Kişisel Bilgiler
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad</FormLabel>
                      <FormControl>
                        <Input placeholder="Adınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soyad</FormLabel>
                      <FormControl>
                        <Input placeholder="Soyadınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ornek@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre Tekrarı</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* İşletme Bilgileri */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                İşletme Bilgileri
              </h3>

              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İşletme / Usta Adı</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Örn: Ahmet Usta Elektrik"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vergi Numarası</FormLabel>
                    <FormControl>
                      <Input placeholder="10 haneli vergi numarası" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TaxPlateUpload />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hizmet Açıklaması</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Sunduğunuz hizmetleri kısaca açıklayın..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Konum ve Kategori */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                Konum ve Hizmet Alanları
              </h3>

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İlçe</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="İlçe seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DISTRICTS.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres (Opsiyonel)</FormLabel>
                    <FormControl>
                      <Input placeholder="Detaylı adres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Hizmet Kategorileri</FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {categories.map((category) => (
                        <FormField
                          key={category.id}
                          control={form.control}
                          name="categoryIds"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category.id)}
                                  onCheckedChange={(checked) => {
                                    const value = field.value || [];
                                    if (checked) {
                                      field.onChange([...value, category.id]);
                                    } else {
                                      field.onChange(
                                        value.filter(
                                          (id: string) => id !== category.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {category.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* KVKK */}
            <FormField
              control={form.control}
              name="kvkkConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      <a
                        href="/kvkk"
                        target="_blank"
                        className="text-brand-primary hover:underline"
                      >
                        KVKK Aydınlatma Metni
                      </a>
                      &apos;ni okudum ve kabul ediyorum.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Kayıt yapılıyor...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Usta Olarak Kayıt Ol
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
