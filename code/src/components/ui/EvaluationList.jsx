"use client";

import React from "react";
import { EvaluationCard } from "./EvaluationCard"; // Corrected import path for EvaluationCard
import { Skeleton } from "./skeleton"; // Corrected import path for Skeleton
import { useEvaluations } from "./EvalUse"; // Corrected import path for EvalUse
import Image from "next/image";

export function EvaluationList() {
  const { evaluations, isLoading, deleteEvaluation } = useEvaluations();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (evaluations.length === 0) {
    return (
      <div className="text-center py-12">
        <Image
          src="https://picsum.photos/seed/noevals/300/200"
          alt="No evaluations yet"
          width={300}
          height={200}
          data-ai-hint="empty document"
          className="mx-auto mb-6 rounded-lg shadow-md"
        />
        <h2 className="text-2xl font-semibold mb-2">No Evaluations Yet</h2>
        <p className="text-muted-foreground">Click "Add New Evaluation" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {evaluations
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((evaluation) => (
          <EvaluationCard key={evaluation.id} evaluation={evaluation} onDelete={deleteEvaluation} />
        ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="border bg-card text-card-foreground shadow-sm rounded-lg p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
