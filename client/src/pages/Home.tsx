import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PresetCard } from "@/components/PresetCard";
import { meditationPresets } from "@/lib/presets";
import { type MeditationPreset, type CustomPreset } from "@shared/schema";
import { Leaf, Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface HomeProps {
  onSelectPreset: (preset: MeditationPreset) => void;
  onShowHistory: () => void;
  onShowBuilder: () => void;
}

export default function Home({ onSelectPreset, onShowHistory, onShowBuilder }: HomeProps) {
  const { toast } = useToast();

  const { data: customPresets = [], isLoading } = useQuery<CustomPreset[]>({
    queryKey: ["/api/custom-presets"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/custom-presets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/custom-presets"] });
      toast({
        title: "Preset deleted",
        description: "Your custom preset has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete preset. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeletePreset = (id: string) => {
    deleteMutation.mutate(id);
  };

  const convertCustomPresetToMeditation = (custom: CustomPreset): MeditationPreset => {
    return {
      id: custom.id,
      name: custom.name,
      description: custom.description,
      type: custom.type as any,
      duration: custom.duration,
      cycles: custom.cycles || undefined,
      intervals: custom.intervals ? JSON.parse(custom.intervals) : undefined,
    };
  };

  const allPresets: MeditationPreset[] = [
    ...meditationPresets,
    ...customPresets.map(convertCustomPresetToMeditation),
  ];
  const isCustomPreset = (presetId: string) => {
    return customPresets.some(cp => cp.id === presetId);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-2xl font-light tracking-wide text-foreground">
              zen timer
            </h1>
            <Leaf className="w-5 h-5 text-primary" />
            <Button
              size="icon"
              variant="ghost"
              onClick={onShowHistory}
              className="ml-2"
              data-testid="button-show-history"
            >
              <Activity className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground tracking-wide">
            Breathe. Focus. Be present.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-sm font-normal tracking-wide text-muted-foreground">
            {customPresets.length > 0 ? "All Presets" : "Built-in Presets"}
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={onShowBuilder}
            data-testid="button-add-custom"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Custom
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-testid="preset-grid">
          {allPresets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              onClick={() => onSelectPreset(preset)}
              onDelete={isCustomPreset(preset.id) ? () => handleDeletePreset(preset.id) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
