import { useState } from "react";

import type { User } from "@watchloop/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@watchloop/components/ui/dialog";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@watchloop/components/ui/button";
import { Input } from "@watchloop/components/ui/input";
import { Label } from "@watchloop/components/ui/label";

import {
  updateProfileSchema,
  type UpdateProfileSchema,
} from "../schemas/updateProfile.schema";

import { useUpdateProfile } from "../hooks/useUpdateProfile";

interface EditProfileDialogProps {
  user: User;
}

export const EditProfileDialog = ({ user }: EditProfileDialogProps) => {
  const { mutate, isPending } = useUpdateProfile();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        fullname: user.fullname,
        email: user.email,
      });
    }
  }, [open, user, reset]);

  const onSubmit = (values: UpdateProfileSchema) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your account information.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>

              <Input id="fullname" {...register("fullname")} />

              {errors.fullname && (
                <p className="text-sm text-destructive">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input id="email" type="email" {...register("email")} />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>

          {/* React Hook Form goes here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
