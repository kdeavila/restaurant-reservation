"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card"
import { Button } from "@/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import { Textarea } from "@/ui/textarea"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Save } from "lucide-react"

export function EmailTemplates() {
  const [activeTemplate, setActiveTemplate] = useState("confirmation")

  const templates = {
    confirmation: {
      subject: "Reservation Confirmation - [RESERVATION_ID]",
      body: `Dear [CUSTOMER_NAME],

We are pleased to confirm your reservation at our restaurant.

Reservation details:
- Date: [RESERVATION_DATE]
- Time: [RESERVATION_TIME]
- Number of people: [NUM_PEOPLE]
- Table: [TABLE_NUMBER]

If you need to make any changes, please contact us.

Thank you for choosing us.

Best regards,
The Restaurant Team`,
    },
    modification: {
      subject: "Reservation Modification - [RESERVATION_ID]",
      body: `Dear [CUSTOMER_NAME],

Your reservation has been modified as requested.

New reservation details:
- Date: [RESERVATION_DATE]
- Time: [RESERVATION_TIME]
- Number of people: [NUM_PEOPLE]
- Table: [TABLE_NUMBER]

If you need to make any other changes, please contact us.

Thank you for choosing us.

Best regards,
The Restaurant Team`,
    },
    cancellation: {
      subject: "Reservation Cancellation - [RESERVATION_ID]",
      body: `Dear [CUSTOMER_NAME],

Your reservation has been cancelled as requested.

Cancelled reservation details:
- Date: [RESERVATION_DATE]
- Time: [RESERVATION_TIME]
- Number of people: [NUM_PEOPLE]

We hope to serve you another time.

Thank you for your understanding.

Best regards,
The Restaurant Team`,
    },
    reminder: {
      subject: "Reservation Reminder - [RESERVATION_ID]",
      body: `Dear [CUSTOMER_NAME],

This is a reminder of your upcoming reservation at our restaurant.

Reservation details:
- Date: [RESERVATION_DATE]
- Time: [RESERVATION_TIME]
- Number of people: [NUM_PEOPLE]
- Table: [TABLE_NUMBER]

We look forward to seeing you soon.

Thank you for choosing us.

Best regards,
The Restaurant Team`,
    },
  }

  const [currentTemplate, setCurrentTemplate] = useState({
    subject: templates[activeTemplate as keyof typeof templates].subject,
    body: templates[activeTemplate as keyof typeof templates].body,
  })

  const handleTemplateChange = (value: string) => {
    setActiveTemplate(value)
    setCurrentTemplate({
      subject: templates[value as keyof typeof templates].subject,
      body: templates[value as keyof typeof templates].body,
    })
  }

  const handleSave = () => {
    // In a real application, changes would be saved to the database here
    console.log("Saving template:", activeTemplate, currentTemplate)
    alert("Template saved successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates</CardTitle>
        <CardDescription>Customize email templates for client notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTemplate} onValueChange={handleTemplateChange}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
            <TabsTrigger value="modification">Modification</TabsTrigger>
            <TabsTrigger value="cancellation">Cancellation</TabsTrigger>
            <TabsTrigger value="reminder">Reminder</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={currentTemplate.subject}
                onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                value={currentTemplate.body}
                onChange={(e) => setCurrentTemplate({ ...currentTemplate, body: e.target.value })}
                className="min-h-[300px] font-mono"
              />
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Available Variables:</h3>
              <ul className="text-xs space-y-1">
                <li>
                  <code>[CUSTOMER_NAME]</code> - Customer name
                </li>
                <li>
                  <code>[RESERVATION_ID]</code> - Reservation ID
                </li>
                <li>
                  <code>[RESERVATION_DATE]</code> - Reservation date
                </li>
                <li>
                  <code>[RESERVATION_TIME]</code> - Reservation time
                </li>
                <li>
                  <code>[NUM_PEOPLE]</code> - Number of people
                </li>
                <li>
                  <code>[TABLE_NUMBER]</code> - Assigned table number - Número de personas
                </li>
                <li>
                  <code>[TABLE_NUMBER]</code> - Assigned table number
                </li>
              </ul>
            </div>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Template
        </Button>
      </CardFooter>
    </Card>
  )
}
