import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معلومات المتجر</CardTitle>
          <CardDescription>تحديث تفاصيل ومعلومات متجرك</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">اسم المتجر</Label>
            <Input id="storeName" defaultValue="SparkIT" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeEmail">البريد الإلكتروني</Label>
            <Input id="storeEmail" type="email" defaultValue="contact@sparkit.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePhone">الهاتف</Label>
            <Input id="storePhone" type="tel" defaultValue="+1 234 567 890" />
          </div>
          <Button>حفظ التغييرات</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الإشعارات</CardTitle>
          <CardDescription>إدارة تفضيلات الإشعارات الخاصة بك</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">إشعارات الطلبات</div>
              <div className="text-sm text-muted-foreground">
                تلقي إشعارات للطلبات الجديدة
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">تنبيهات المخزون المنخفض</div>
              <div className="text-sm text-muted-foreground">
                احصل على إشعار عندما تنخفض المنتجات
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">تقييمات العملاء</div>
              <div className="text-sm text-muted-foreground">
                إشعارات لتقييمات العملاء الجديدة
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
