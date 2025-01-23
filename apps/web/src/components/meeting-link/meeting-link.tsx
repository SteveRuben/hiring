import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"
import Link from "next/link"
import { useExpiringToggle } from "@/hooks/use-expiring-toggle"
import { Analytics } from "@/lib/analytics"
import { toast } from "sonner"

export function MeetingLink({ meetingRoute }: { meetingRoute: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useExpiringToggle(false, 3000)
  const meetingUrl = `${window.location.origin}/${meetingRoute}`

  const onCopyLink = async () => {
    try {
      setCopied(true)
      await navigator.clipboard.writeText(meetingUrl)
      Analytics.trackEvent("page_meetingLink_buttonPressed", "copyLink")
    } catch (err) {
      toast.error(t("pages.meetingLink.copyErrorMsg"))
      console.error(err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        {t("pages.meetingLink.titleText")}
      </h1>
      
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              value={meetingUrl}
              readOnly
              className="flex-1"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={onCopyLink}
                className="w-full sm:w-auto"
                variant={copied ? "secondary" : "default"}
              >
                {copied ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {t(`pages.meetingLink.${copied ? "copied" : "copyLinkButton"}`)}
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  Analytics.trackEvent("page_meetingLink_buttonPressed", "joinRoom")
                }}
              >
                <Link href={`/${meetingRoute}`}>
                  {t("pages.meetingLink.joinRoomButton")}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-gray-600">
        {t("pages.meetingLink.explanationText")}
      </p>
    </div>
  )
}