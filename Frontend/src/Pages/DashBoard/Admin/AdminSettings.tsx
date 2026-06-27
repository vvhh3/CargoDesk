import { useState } from "react"
import {
  Bell,
  Shield,
  Globe,
  Database,
  CreditCard,
  Webhook,
  ChevronRight,
  Save,
  RotateCcw,
  Check,
  AlertTriangle,
} from "lucide-react"
import { useSetingStore } from "../../../Store/SettingsStore"
import toast from "react-hot-toast"

type SettingsSection =
  | "general"
  | "notifications"
  | "security"
  | "integrations"
  | "billing"
  | "data";

const sections: { id: SettingsSection; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "general", label: "General", icon: Globe, desc: "Platform name, locale, timezone" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Email, push, Slack alerts" },
  { id: "security", label: "Security", icon: Shield, desc: "Auth, 2FA, session policy" },
  { id: "integrations", label: "Integrations", icon: Webhook, desc: "Webhooks, API keys, external services" },
  { id: "billing", label: "Billing", icon: CreditCard, desc: "Plan, invoices, usage limits" },
  { id: "data", label: "Data & Storage", icon: Database, desc: "Backups, retention, export" },
]

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-[#7C3AED]" : "bg-white/10"}`}>
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}/>
    </button>
  )
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#7C3AED]/60 transition-colors"/>
  )
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#7C3AED]/60 transition-colors appearance-none cursor-pointer">
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#18181B]">
          {o}
        </option>
      ))}
    </select>
  )
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        {desc && <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>}
      </div>
      <div className="ml-8 shrink-0">{children}</div>
    </div>
  )
}

const AdminSettings = () =>  {
  const [active, setActive] = useState<SettingsSection>("general");
  const [saved, setSaved] = useState(false);

  // General
  const title = useSetingStore(s => s.title)
  const setTitle = useSetingStore(s => s.setTitle)

  const [platformName, setPlatformName] = useState(title!);
  const [timezone, setTimezone] = useState("UTC+3 (Moscow)");
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [slackWebhook, setSlackWebhook] = useState("");

  // Security
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("8 hours");
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [loginNotify, setLoginNotify] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState("Strong");

  // Integrations
  const [apiKey] = useState("sk-cargo-••••••••••••••••3f9a");
  const [webhookUrl, setWebhookUrl] = useState("https://");
  const [webhookEnabled, setWebhookEnabled] = useState(false);

  // Data
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFreq, setBackupFreq] = useState("Daily");
  const [retentionDays, setRetentionDays] = useState("90");

  const handleSave = async () => {
    try{
      setSaved(true);
      setTitle(platformName)
      toast.success("Success")
      setTimeout(() => setSaved(false), 2500);
      
    }catch(e){
      toast.error("Error, check data and repeat")
    }
  }

  return (
    <div className="flex h-screen bg-[#09090B] overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-white">System Settings</h1>
              <p className="text-zinc-400 text-sm mt-1">
                Configure platform behaviour, integrations, and security policies.
              </p>
            </div>

            <div className="flex gap-6">

              <div className="w-56 shrink-0 space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      active === s.id
                        ? "bg-linear-to-r from-[#7C3AED]/20 to-[#8B5CF6]/20 text-white border border-[#7C3AED]/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <s.icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{s.label}</span>
                    {active === s.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                ))}
              </div>

              <div className="flex-1">
                <div className="bg-white/3 border border-white/8 rounded-2xl p-6 backdrop-blur-sm">
                  {active === "general" && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-400" />
                        </div>
                        
                        <div>
                          <h2 className="text-base font-semibold text-white">General</h2>
                          <p className="text-xs text-zinc-500">Basic platform configuration</p>
                        </div>

                      </div>
                      <SettingRow label="Platform Name" desc="Displayed in the browser tab and emails">
                        <Input value={platformName} onChange={setPlatformName} />
                      </SettingRow>
                      <SettingRow label="Support Email" desc="Replies from notifications will come from this address">
                        <Input value="support@cargodesk.io" onChange={() => {}} />
                      </SettingRow>
                      <SettingRow label="Default Language">
                        <Select value={language} onChange={setLanguage} options={["English", "Russian", "Chinese", "Arabic"]} />
                      </SettingRow>
                      <SettingRow label="Timezone">
                        <Select
                          value={timezone}
                          onChange={setTimezone}
                          options={["UTC+0", "UTC+3 (Moscow)", "UTC+5:30 (IST)", "UTC+8 (CST)", "UTC-5 (EST)"]}
                        />
                      </SettingRow>
                      <SettingRow label="Default Currency">
                        <Select value={currency} onChange={setCurrency} options={["USD", "EUR", "RUB", "CNY", "AED"]} />
                      </SettingRow>
                      <SettingRow label="Maintenance Mode" desc="Disables access for all non-admin users">
                        <Toggle enabled={false} onChange={() => {}} />
                      </SettingRow>
                    </div>
                  )}

                  {active === "notifications" && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-yellow-500/15 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-white">Notifications</h2>
                          <p className="text-xs text-zinc-500">Delivery channels and alert rules</p>
                        </div>
                      </div>
                      <SettingRow label="Email Alerts" desc="Order status changes, new requests">
                        <Toggle enabled={emailAlerts} onChange={setEmailAlerts} />
                      </SettingRow>
                      <SettingRow label="Push Notifications" desc="In-app real-time alerts">
                        <Toggle enabled={pushAlerts} onChange={setPushAlerts} />
                      </SettingRow>
                      <SettingRow label="Slack Integration" desc="Send critical alerts to a Slack channel">
                        <Toggle enabled={slackAlerts} onChange={setSlackAlerts} />
                      </SettingRow>
                      {slackAlerts && (
                        <SettingRow label="Slack Webhook URL">
                          <Input value={slackWebhook} onChange={setSlackWebhook} placeholder="https://hooks.slack.com/..." />
                        </SettingRow>
                      )}
                      <SettingRow label="Weekly Summary Report" desc="Sent every Monday at 09:00">
                        <Toggle enabled={weeklyReport} onChange={setWeeklyReport} />
                      </SettingRow>
                      <SettingRow label="SMTP Server" desc="Custom email server for outbound mail">
                        <Input value="smtp.cargodesk.io:587" onChange={() => {}} />
                      </SettingRow>
                    </div>
                  )}

                  {active === "security" && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-white">Security</h2>
                          <p className="text-xs text-zinc-500">Authentication and access policies</p>
                        </div>
                      </div>
                      <SettingRow label="Two-Factor Authentication" desc="Require 2FA for all admin accounts">
                        <Toggle enabled={twoFactor} onChange={setTwoFactor} />
                      </SettingRow>
                      <SettingRow label="Session Timeout">
                        <Select value={sessionTimeout} onChange={setSessionTimeout} options={["1 hour", "4 hours", "8 hours", "24 hours", "7 days"]} />
                      </SettingRow>
                      <SettingRow label="Password Policy">
                        <Select value={passwordPolicy} onChange={setPasswordPolicy} options={["Basic", "Strong", "Very Strong"]} />
                      </SettingRow>
                      <SettingRow label="IP Whitelist" desc="Restrict admin panel to specific IPs">
                        <Toggle enabled={ipWhitelist} onChange={setIpWhitelist} />
                      </SettingRow>
                      <SettingRow label="Login Notifications" desc="Email alert on new sign-in">
                        <Toggle enabled={loginNotify} onChange={setLoginNotify} />
                      </SettingRow>
                      <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-orange-300">
                          Changing security policies will require active sessions to re-authenticate within 15 minutes.
                        </p>
                      </div>
                    </div>
                  )}

                  {active === "integrations" && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                          <Webhook className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-white">Integrations</h2>
                          <p className="text-xs text-zinc-500">API keys, webhooks, third-party services</p>
                        </div>
                      </div>
                      <SettingRow label="API Key" desc="Used for external system access">
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-zinc-300 font-mono">
                            {apiKey}
                          </code>
                          <button className="text-xs text-[#8B5CF6] hover:underline">Rotate</button>
                        </div>
                      </SettingRow>
                      <SettingRow label="Outbound Webhook" desc="POST order events to your endpoint">
                        <Toggle enabled={webhookEnabled} onChange={setWebhookEnabled} />
                      </SettingRow>
                      {webhookEnabled && (
                        <SettingRow label="Webhook URL">
                          <Input value={webhookUrl} onChange={setWebhookUrl} placeholder="https://your-server.com/hook" />
                        </SettingRow>
                      )}
                      <SettingRow label="Mail Provider">
                        <Select value="SendGrid" onChange={() => {}} options={["SendGrid", "Mailgun", "AWS SES", "Custom SMTP"]} />
                      </SettingRow>
                      <SettingRow label="Payment Gateway">
                        <Select value="Stripe" onChange={() => {}} options={["Stripe", "PayPal", "YooMoney", "None"]} />
                      </SettingRow>
                    </div>
                  )}

                  {active === "billing" && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-white">Billing</h2>
                          <p className="text-xs text-zinc-500">Plan, invoices, and usage caps</p>
                        </div>
                      </div>
                      <div className="p-4 bg-linear-to-r from-[#7C3AED]/15 to-[#3B82F6]/15 border border-[#7C3AED]/30 rounded-xl mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white">Enterprise Plan</div>
                            <div className="text-xs text-zinc-400 mt-0.5">Unlimited users · 500 GB storage · Priority support</div>
                          </div>
                          <span className="text-xs bg-[#7C3AED]/30 text-purple-300 px-3 py-1 rounded-full border border-[#7C3AED]/40">
                            Active
                          </span>
                        </div>
                      </div>
                      <SettingRow label="Max Active Orders" desc="Hard cap per billing cycle">
                        <Input value="10,000" onChange={() => {}} />
                      </SettingRow>
                      <SettingRow label="Storage Quota" desc="Current usage: 126 GB">
                        <Select value="500 GB" onChange={() => {}} options={["100 GB", "250 GB", "500 GB", "1 TB", "Unlimited"]} />
                      </SettingRow>
                      <SettingRow label="Invoice Email">
                        <Input value="finance@company.com" onChange={() => {}} />
                      </SettingRow>
                      <SettingRow label="Auto-renew Subscription">
                        <Toggle enabled={true} onChange={() => {}} />
                      </SettingRow>
                    </div>
                  )}

                  {active === "data" && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/15 flex items-center justify-center">
                          <Database className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                          <h2 className="text-base font-semibold text-white">Data & Storage</h2>
                          <p className="text-xs text-zinc-500">Backup schedule, retention, exports</p>
                        </div>
                      </div>
                      <SettingRow label="Automatic Backups">
                        <Toggle enabled={autoBackup} onChange={setAutoBackup} />
                      </SettingRow>
                      <SettingRow label="Backup Frequency">
                        <Select value={backupFreq} onChange={setBackupFreq} options={["Hourly", "Daily", "Weekly"]} />
                      </SettingRow>
                      <SettingRow label="Retention Period (days)">
                        <Input value={retentionDays} onChange={setRetentionDays} />
                      </SettingRow>
                      <SettingRow label="Export Format">
                        <Select value="JSON + CSV" onChange={() => {}} options={["JSON", "CSV", "JSON + CSV", "XLSX"]} />
                      </SettingRow>
                      <div className="mt-4 flex gap-3">
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-zinc-300 hover:bg-white/10 transition-colors flex items-center gap-2">
                          <Database className="w-4 h-4" /> Export All Data
                        </button>
                        <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> Purge Old Data
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-5">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-zinc-300 hover:bg-white/10 transition-colors">
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] rounded-xl text-sm text-white hover:opacity-90 cursor-pointer"
                  >
                    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? "Saved!" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminSettings
