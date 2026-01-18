
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockCustomers = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", orders: 12, spent: 3450 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", orders: 8, spent: 2100 },
  { id: 3, name: "Mohammed Ali", email: "mohammed@example.com", orders: 15, spent: 5200 },
  { id: 4, name: "Emily Chen", email: "emily@example.com", orders: 5, spent: 1800 },
  { id: 5, name: "Omar Khalil", email: "omar@example.com", orders: 20, spent: 6700 },
]

export default function CustomersPage() {
  const { language } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{language === "en" ? "Customers" : "العملاء"}</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === "en" ? "Search customers..." : "البحث عن العملاء..."}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "All Customers" : "جميع العملاء"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "en" ? "Customer" : "العميل"}</TableHead>
                  <TableHead>{language === "en" ? "Email" : "البريد الإلكتروني"}</TableHead>
                  <TableHead>{language === "en" ? "Orders" : "الطلبات"}</TableHead>
                  <TableHead>{language === "en" ? "Total Spent" : "إجمالي الإنفاق"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-medium">${customer.spent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

