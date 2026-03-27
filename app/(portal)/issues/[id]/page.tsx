"use client"

import { ChevronDown, ImagePlus, Plus, Send, X } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use, useRef, useState } from "react"

import { GlassCard } from "@/components/glass-card"
import { PageHeader } from "@/components/page-header"
import { PriorityBadge } from "@/components/priority-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ISSUE_STATUS_LABELS, ISSUE_STATUS_ORDER } from "@/lib/constants"
import { formatDate, formatRelativeDate, fullName } from "@/lib/helpers/formatting"
import {
  getIssueById,
  getPropertyById,
  getWorkerById,
  workers,
} from "@/lib/mock-data"
import type { Comment, IssueStatus } from "@/lib/types"

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const issue = getIssueById(id)
  if (!issue) notFound()

  const property = getPropertyById(issue.propertyId)

  const [status, setStatus] = useState<IssueStatus>(issue.status)
  const [assignedWorkerIds, setAssignedWorkerIds] = useState<string[]>(
    issue.assignedWorkerIds
  )
  const [comments, setComments] = useState<Comment[]>(issue.comments)
  const [newComment, setNewComment] = useState("")
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleStatusChange(newStatus: IssueStatus) {
    setStatus(newStatus)
  }

  function handleAssignWorker(workerId: string) {
    if (!assignedWorkerIds.includes(workerId)) {
      setAssignedWorkerIds((prev) => [...prev, workerId])
    }
    setAssignDialogOpen(false)
  }

  function handleRemoveWorker(workerId: string) {
    setAssignedWorkerIds((prev) => prev.filter((wid) => wid !== workerId))
  }

  function handleAddComment() {
    if (!newComment.trim()) return
    const comment: Comment = {
      id: `com-new-${Date.now()}`,
      authorName: "Alex Morgan",
      text: newComment.trim(),
      photoUrls: [...photoUrls],
      createdAt: new Date().toISOString(),
    }
    setComments((prev) => [...prev, comment])
    setNewComment("")
    setPhotoUrls([])
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    const urls = Array.from(files).map((file) => URL.createObjectURL(file))
    setPhotoUrls((prev) => [...prev, ...urls])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function removePhoto(index: number) {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const availableWorkers = workers.filter(
    (w) => !assignedWorkerIds.includes(w.id)
  )

  return (
    <div className="space-y-6">
      <PageHeader title={issue.title} />

      {/* Status dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            {ISSUE_STATUS_LABELS[status]}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {ISSUE_STATUS_ORDER.map((s) => (
            <DropdownMenuItem key={s} onSelect={() => handleStatusChange(s)}>
              {ISSUE_STATUS_LABELS[s]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex gap-6 items-start">
        {/* Main content */}
        <div className="flex-1 space-y-6 min-w-0">
          <GlassCard className="p-6">
            <h2 className="mb-2 text-sm font-heading text-muted-foreground">
              Description
            </h2>
            <p>{issue.description}</p>
          </GlassCard>

          {property && (
            <GlassCard className="p-6">
              <h2 className="mb-2 text-sm font-heading text-muted-foreground">
                Property
              </h2>
              <p className="mb-3">{property.name}</p>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/properties/${property.id}`}>
                  See Property Profile
                </Link>
              </Button>
            </GlassCard>
          )}

          {/* Comments */}
          <GlassCard className="p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Comments ({comments.length})
            </h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {comment.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {comment.authorName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{comment.text}</p>
                    {comment.photoUrls.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {comment.photoUrls.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`Photo ${i + 1}`}
                            className="h-20 w-20 rounded-md border object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Add comment */}
            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              {photoUrls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photoUrls.map((url, i) => (
                    <div key={i} className="group relative">
                      <img
                        src={url}
                        alt={`Upload ${i + 1}`}
                        className="h-16 w-16 rounded-md border object-cover"
                      />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus className="mr-1 h-4 w-4" />
                  Photo
                </Button>
                <Button size="sm" onClick={handleAddComment}>
                  <Send className="mr-1 h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right sidebar — single unified card */}
        <div className="w-[340px] shrink-0">
          <GlassCard className="p-6 space-y-5">
            {/* Priority (labeled Status in design) */}
            <div className="flex items-center gap-4">
              <span className="w-[130px] shrink-0 text-sm font-heading text-muted-foreground">
                Status
              </span>
              <PriorityBadge priority={issue.priority} />
            </div>

            {/* Assigned Workers */}
            <div className="flex items-start gap-4">
              <span className="w-[130px] shrink-0 text-sm font-heading text-muted-foreground">
                Assigned Workers
              </span>
              <div className="flex flex-col gap-2">
                {assignedWorkerIds.length === 0 ? (
                  <p className="text-sm text-muted-foreground">None</p>
                ) : (
                  assignedWorkerIds.map((wId) => {
                    const worker = getWorkerById(wId)
                    if (!worker) return null
                    return (
                      <div key={wId} className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {worker.firstName[0]}
                            {worker.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{fullName(worker)}</span>
                        <button
                          onClick={() => handleRemoveWorker(wId)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )
                  })
                )}
                <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="xs" className="mt-1 w-fit">
                      <Plus className="mr-1 h-3 w-3" />
                      Assign
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Worker</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      {availableWorkers.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          All workers are already assigned
                        </p>
                      ) : (
                        availableWorkers.map((worker) => (
                          <button
                            key={worker.id}
                            onClick={() => handleAssignWorker(worker.id)}
                            className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-accent"
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {worker.firstName[0]}
                                {worker.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {fullName(worker)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {worker.specialties.join(", ")}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Created */}
            <div className="flex items-center gap-4">
              <span className="w-[130px] shrink-0 text-sm font-heading text-muted-foreground">
                Created
              </span>
              <span className="text-sm">{formatDate(issue.createdAt)}</span>
            </div>

            {/* Updated */}
            <div className="flex items-center gap-4">
              <span className="w-[130px] shrink-0 text-sm font-heading text-muted-foreground">
                Updated
              </span>
              <span className="text-sm">{formatDate(issue.updatedAt)}</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
