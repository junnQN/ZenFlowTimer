import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, X, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { presetTypes, type BreathingPhase } from "@shared/schema";

interface PresetBuilderProps {
  onBack: () => void;
  onSaved?: () => void;
}

const breathingPhases: BreathingPhase[] = ["inhale", "hold", "exhale", "hold2", "rest"];

const intervalSchema = z.object({
  phase: z.enum(["inhale", "hold", "exhale", "hold2", "rest"]),
  duration: z.number().min(1, "Duration must be at least 1 second"),
  instruction: z.string().min(1, "Instruction is required"),
});

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  description: z.string().min(1, "Description is required").max(100, "Description too long"),
  type: z.enum([
    presetTypes.COUNTDOWN,
    presetTypes.BOX_BREATHING,
    presetTypes.BREATHING_478,
    presetTypes.CYCLIC_SIGHING,
    presetTypes.DIAPHRAGMATIC,
    presetTypes.ALTERNATE_NOSTRIL,
    presetTypes.BODY_SCAN,
    presetTypes.CUSTOM_INTERVAL,
  ]),
  duration: z.number().min(60, "Duration must be at least 60 seconds"),
  cycles: z.number().min(1, "At least 1 cycle required").optional(),
  intervals: z.array(intervalSchema).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function PresetBuilder({ onBack, onSaved }: PresetBuilderProps) {
  const { toast } = useToast();
  const [intervals, setIntervals] = useState<Array<{ phase: BreathingPhase; duration: number; instruction: string }>>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: presetTypes.COUNTDOWN,
      duration: 300,
      cycles: 1,
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        ...data,
        intervals: intervals.length > 0 ? JSON.stringify(intervals) : "",
        cycles: data.cycles || null,
      };
      return await apiRequest("POST", "/api/custom-presets", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/custom-presets"] });
      toast({
        title: "Preset saved",
        description: "Your custom preset has been created successfully.",
      });
      form.reset();
      setIntervals([]);
      if (onSaved) onSaved();
      onBack();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save preset. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    saveMutation.mutate(data);
  };

  const addInterval = () => {
    setIntervals([...intervals, { phase: "inhale", duration: 4, instruction: "Breathe in" }]);
  };

  const removeInterval = (index: number) => {
    setIntervals(intervals.filter((_, i) => i !== index));
  };

  const updateInterval = (index: number, field: keyof typeof intervals[0], value: any) => {
    const updated = [...intervals];
    updated[index] = { ...updated[index], [field]: value };
    setIntervals(updated);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-light tracking-wide text-foreground mb-2">
              Create Custom Preset
            </h1>
            <p className="text-sm text-muted-foreground tracking-wide">
              Design your own breathing pattern
            </p>
          </div>
        </div>

        <Card className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal tracking-wide">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Custom Preset"
                        {...field}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal tracking-wide">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of your preset"
                        {...field}
                        data-testid="input-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal tracking-wide">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-type">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={presetTypes.COUNTDOWN}>Countdown</SelectItem>
                        <SelectItem value={presetTypes.BOX_BREATHING}>Box Breathing</SelectItem>
                        <SelectItem value={presetTypes.BREATHING_478}>4-7-8 Breathing</SelectItem>
                        <SelectItem value={presetTypes.CYCLIC_SIGHING}>Cyclic Sighing</SelectItem>
                        <SelectItem value={presetTypes.DIAPHRAGMATIC}>Diaphragmatic</SelectItem>
                        <SelectItem value={presetTypes.ALTERNATE_NOSTRIL}>Alternate Nostril</SelectItem>
                        <SelectItem value={presetTypes.BODY_SCAN}>Body Scan</SelectItem>
                        <SelectItem value={presetTypes.CUSTOM_INTERVAL}>Custom Interval</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal tracking-wide">Duration (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="300"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-duration"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cycles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal tracking-wide">Cycles (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                        value={field.value || ""}
                        data-testid="input-cycles"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-normal tracking-wide">Intervals (optional)</label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addInterval}
                    data-testid="button-add-interval"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Interval
                  </Button>
                </div>

                {intervals.map((interval, index) => (
                  <Card key={index} className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Interval {index + 1}</span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeInterval(index)}
                        data-testid={`button-remove-interval-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Phase</label>
                        <Select
                          value={interval.phase}
                          onValueChange={(value) => updateInterval(index, "phase", value as BreathingPhase)}
                        >
                          <SelectTrigger data-testid={`select-interval-phase-${index}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {breathingPhases.map((phase) => (
                              <SelectItem key={phase} value={phase}>
                                {phase}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Duration (seconds)</label>
                        <Input
                          type="number"
                          value={interval.duration}
                          onChange={(e) => updateInterval(index, "duration", parseInt(e.target.value) || 1)}
                          data-testid={`input-interval-duration-${index}`}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Instruction</label>
                        <Input
                          value={interval.instruction}
                          onChange={(e) => updateInterval(index, "instruction", e.target.value)}
                          placeholder="Breathe in"
                          data-testid={`input-interval-instruction-${index}`}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={saveMutation.isPending}
                data-testid="button-save"
              >
                {saveMutation.isPending ? "Saving..." : "Save Preset"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
