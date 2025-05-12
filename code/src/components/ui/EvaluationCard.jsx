"use client";

import React from "react";
import { Button } from "./button"; // Corrected import path for Button
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"; // Corrected import path for Card
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"; // Corrected import path for AlertDialog
import { Edit3, Trash2, CalendarDays } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export function EvaluationCard({ evaluation, onDelete }) {
  const handleDelete = () => {
    onDelete(evaluation.id);
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{evaluation.studentName}</CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground pt-1">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          {format(new Date(evaluation.internshipStartDate), "MMM d, yyyy")} -{" "}
          {format(new Date(evaluation.internshipEndDate), "MMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Performance:</span> {evaluation.overallPerformance}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-semibold text-foreground">Skills:</span> {evaluation.skills}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/evaluations/${evaluation.id}/edit`}>
            <Edit3 className="mr-2 h-4 w-4" /> Edit
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the evaluation for{" "}
                {evaluation.studentName}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
