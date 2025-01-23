import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Analytics } from "@/lib/analytics/analytics"
import { useTranslation } from "@/components/i18n";
import { Logo } from "../ui/logo";


export function PostMeeting({ roomRoute }: { roomRoute: string }) {
  const { t } = useTranslation()
  const roomLink = `${window.location.origin}/${roomRoute}`

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <div className="mb-8">
        <Logo />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        {t("pages.postMeeting.title")}
      </h1>

      <Card className="w-full max-w-3xl mb-6">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Button
            asChild
            className="mb-4"
            onClick={() => {
              Analytics.trackEvent("page_postMeeting_createNewMeeting", true)
            }}
          >
            <Link href="/create">
              {t("pages.postMeeting.createAnother")}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <p className="mb-4">
            {t("pages.postMeeting.saveThisLink")}
          </p>
          <Link 
            href={roomLink}
            className="text-primary-foreground hover:underline"
          >
            {roomLink}
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}