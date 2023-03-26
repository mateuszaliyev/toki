import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  MdAdd,
  MdCancel,
  MdDelete,
  MdSave,
  MdSchedule,
  MdStraighten,
  MdTextFields,
  MdTimer,
} from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ListItem } from "@/components/list/item";
import { Select } from "@/components/select";

import { useCounter, useCounterActions } from "@/hooks/counter";
import { useView } from "@/hooks/store";

import { dateFormatters, formatDate } from "@/i18n/polish";

import { heading } from "@/styles/heading";

import { toDatetimeLocalString } from "@/utilities/datetime-local";
import { UNITS } from "@/utilities/units";

export type CounterFormProps<EditSelected extends boolean> = {
  editSelected?: EditSelected;
};

type CounterFormSchema = z.infer<typeof counterFormSchema>;

const counterDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(new Date(value).getTime()));

const counterNameSchema = z
  .string()
  .max(31, "Nazwa jest zbyt długa.")
  .min(1, "Nazwa jest wymagana.");

const counterFormSchema = z.object({
  date: counterDateSchema.refine((value) => new Date(value) <= new Date(), {
    message: "Należy podać datę z przeszłości.",
  }),
  figures: z
    .object({
      id: z.string().optional(),
      name: counterNameSchema,
      quantity: z.number({
        invalid_type_error: "Ilość jest wymagana.",
      }),
      unit: z.enum(UNITS),
      value: z.number({
        invalid_type_error: "Przedział czasu jest wymagany.",
      }),
    })
    .array(),
  milestones: z
    .object({
      date: counterDateSchema,
      id: z.string().optional(),
      name: counterNameSchema,
    })
    .array(),
  name: counterNameSchema,
});

export const CounterForm = <EditSelected extends boolean>({
  editSelected,
}: CounterFormProps<EditSelected>) => {
  const selectedCounter = useCounter();

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<CounterFormSchema>({
    defaultValues: {
      date: toDatetimeLocalString(
        editSelected && selectedCounter
          ? new Date(selectedCounter.timestamp)
          : new Date()
      ),
      figures: editSelected && selectedCounter ? selectedCounter.figures : [],
      milestones:
        editSelected && selectedCounter
          ? selectedCounter.milestones.map(({ timestamp, ...milestone }) => ({
              ...milestone,
              date: toDatetimeLocalString(new Date(timestamp)),
            }))
          : [],
      name: editSelected && selectedCounter ? selectedCounter.name : "",
    },
    delayError: 1000,
    mode: "onChange",
    resolver: zodResolver(counterFormSchema),
  });

  const figures = useFieldArray({
    control,
    name: "figures",
  });

  const milestones = useFieldArray({
    control,
    name: "milestones",
  });

  const counterDate = watch("date");
  const counterName = watch("name");
  const figuresValues = watch("figures");
  const milestonesValues = watch("milestones");

  const { createCounter, updateCounter } = useCounterActions();
  const { setView } = useView();

  const onSubmit = ({ date, figures, milestones, name }: CounterFormSchema) => {
    if (editSelected && selectedCounter) {
      updateCounter({
        figures,
        id: selectedCounter.id,
        milestones: milestones.map(({ date, ...milestone }) => ({
          ...milestone,
          timestamp: new Date(date).getTime(),
        })),
        name,
        timestamp: new Date(date).getTime(),
      });
    } else {
      createCounter({
        figures,
        milestones: milestones.map(({ date, ...milestone }) => ({
          ...milestone,
          timestamp: new Date(date).getTime(),
        })),
        name,
        timestamp: new Date(date).getTime(),
      });
    }
    setView(editSelected ? "list" : "counter");
  };

  return (
    <form
      className="flex grow flex-col pb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-20 items-center justify-between border-b border-gray-300 dark:border-gray-800">
        <Button
          className="relative h-full border-r border-gray-300 px-10 outline-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-900/0 after:transition hover:after:bg-gray-900 focus-visible:after:bg-gray-900 dark:border-gray-800 dark:after:bg-gray-100/0 dark:hover:after:bg-gray-100 dark:focus-visible:after:bg-gray-100"
          disabled={Boolean(errors.name) || Boolean(errors.date)}
          icon={MdCancel}
          onClick={() => {
            setView("list");
          }}
          type="button"
        >
          Anuluj
        </Button>
        <Button
          className="relative h-full border-l border-gray-300 px-10 outline-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-900/0 after:transition hover:after:bg-gray-900 focus-visible:after:bg-gray-900 dark:border-gray-800 dark:after:bg-gray-100/0 dark:hover:after:bg-gray-100 dark:focus-visible:after:bg-gray-100"
          icon={MdSave}
        >
          Zapisz
        </Button>
      </div>
      <div className="px-10">
        <div className="flex items-center gap-8">
          <h1
            className={heading({
              className: "truncate lg:hidden",
              tall: true,
            })}
          >
            {counterName || (editSelected ? "Edytuj licznik" : "Nowy licznik")}
          </h1>
          <h1
            className={heading({
              className: "hidden truncate lg:block",
              size: "large",
              tall: true,
            })}
          >
            {counterName || (editSelected ? "Edytuj licznik" : "Nowy licznik")}
          </h1>
          <time
            className="hidden whitespace-nowrap sm:block"
            dateTime={new Date(counterDate).toISOString()}
          >
            {formatDate(new Date(counterDate), "long")}
          </time>
        </div>
        <div className="flex flex-col gap-4">
          <section className="flex flex-col md:flex-row">
            <label className="grow">
              <Input
                error={errors.name?.message}
                icon={MdTextFields}
                placeholder="Nazwa"
                required
                type="text"
                {...register("name")}
              />
            </label>
            <label className="grow">
              <Input
                error={errors.date?.message}
                icon={MdSchedule}
                required
                type="datetime-local"
                {...register("date")}
              />
            </label>
          </section>
          <section className="flex flex-col gap-8">
            <header className="flex justify-between">
              <h2 className={heading({ className: "truncate", tall: true })}>
                Powiązane wartości
              </h2>
              <Button
                className="self-center"
                icon={MdAdd}
                onClick={() =>
                  figures.prepend({
                    id: "",
                    name: "",
                    unit: "days",
                  } as CounterFormSchema["figures"][number])
                }
                type="button"
                variant="secondary"
              >
                Dodaj
              </Button>
            </header>
            <ul className="flex flex-col">
              {figures.fields.map((figure, index) => (
                <ListItem
                  borders="all"
                  className="flex flex-col gap-8"
                  key={figure.id}
                >
                  <div className="hidden items-center gap-8 lg:flex">
                    <h3
                      className={heading({
                        className: "truncate",
                      })}
                    >
                      {figuresValues[index].name || "Nowa powiązana wartość"}
                    </h3>
                    <Button
                      className="ml-auto text-red-500 hover:text-current focus-visible:text-current"
                      icon={MdDelete}
                      onClick={() => figures.remove(index)}
                      type="button"
                    >
                      Usuń
                    </Button>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    <label className="basis-1/2">
                      <Input
                        error={errors?.figures?.[index]?.name?.message}
                        icon={MdTextFields}
                        placeholder="Nazwa"
                        required
                        type="text"
                        {...register(`figures.${index}.name`)}
                      />
                    </label>
                    <div className="grid basis-1/2 grid-cols-3">
                      <label>
                        <Input
                          error={errors?.figures?.[index]?.quantity?.message}
                          icon={MdStraighten}
                          placeholder="Ilość"
                          required
                          type="number"
                          {...register(`figures.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                        />
                      </label>
                      <label>
                        <Input
                          error={errors?.figures?.[index]?.value?.message}
                          icon={MdTimer}
                          placeholder="Przedział czasu"
                          required
                          type="number"
                          {...register(`figures.${index}.value`, {
                            valueAsNumber: true,
                          })}
                        />
                      </label>
                      <Controller
                        control={control}
                        name={`figures.${index}.unit`}
                        render={({ field }) => (
                          <Select
                            disabled={!figuresValues[index].value}
                            onChange={(option) => field.onChange(option.value)}
                            options={UNITS.map((unit) => ({
                              name: dateFormatters[unit](
                                figuresValues[index].value
                              ),
                              value: unit,
                            }))}
                            value={{
                              name: dateFormatters[field.value](
                                figuresValues[index].value
                              ),
                              value: field.value,
                            }}
                          />
                        )}
                      />
                      <input
                        type="hidden"
                        {...register(`figures.${index}.id`)}
                      />
                    </div>
                  </div>
                </ListItem>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-8">
            <header className="flex justify-between">
              <h2 className={heading({ className: "truncate", tall: true })}>
                Kamienie milowe
              </h2>
              <Button
                className="self-center"
                icon={MdAdd}
                onClick={() => {
                  milestones.prepend({
                    date: toDatetimeLocalString(new Date()),
                    id: "",
                    name: "",
                  });
                }}
                type="button"
                variant="secondary"
              >
                Dodaj
              </Button>
            </header>
            <ul className="flex flex-col">
              {milestones.fields.map((milestone, index) => (
                <ListItem
                  borders="all"
                  className="group flex flex-col gap-8"
                  key={milestone.id}
                >
                  <div className="hidden items-center gap-8 lg:flex">
                    <h3
                      className={heading({
                        className: "truncate",
                      })}
                    >
                      {milestonesValues[index].name || "Nowy kamień milowy"}
                    </h3>
                    <time
                      className="mr-auto hidden whitespace-nowrap text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100 lg:block"
                      dateTime={new Date(
                        milestonesValues[index].date
                      ).toISOString()}
                    >
                      {formatDate(
                        new Date(milestonesValues[index].date),
                        "long"
                      )}
                    </time>
                    <time
                      className="mr-auto whitespace-nowrap text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100 lg:hidden"
                      dateTime={new Date(
                        milestonesValues[index].date
                      ).toISOString()}
                    >
                      {formatDate(
                        new Date(milestonesValues[index].date),
                        "short"
                      )}
                    </time>
                    <Button
                      className="text-red-500 hover:text-current focus-visible:text-current"
                      icon={MdDelete}
                      onClick={() => milestones.remove(index)}
                      type="button"
                    >
                      Usuń
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row">
                    <label className="grow">
                      <Input
                        error={errors?.milestones?.[index]?.name?.message}
                        icon={MdTextFields}
                        placeholder="Nazwa"
                        required
                        type="text"
                        {...register(`milestones.${index}.name`)}
                      />
                    </label>
                    <label className="grow">
                      <Input
                        error={errors?.milestones?.[index]?.date?.message}
                        icon={MdSchedule}
                        required
                        type="datetime-local"
                        {...register(`milestones.${index}.date`)}
                      />
                    </label>
                    <input
                      type="hidden"
                      {...register(`milestones.${index}.id`)}
                    />
                  </div>
                </ListItem>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </form>
  );
};
