import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Target, Palette, Download, Trash2, Save, } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
    const { toast } = useToast();
    const [profile, setProfile] = useState({
        name: "Kaizen Master",
        email: "master@kaizen.com",
        timezone: "UTC-5",
    });

    const [notifications, setNotifications] = useState({
        dailyReminder: true,
        weeklyReport: true,
        streakAlerts: true,
        goalDeadlines: false,
    });

    const [preferences, setPreferences] = useState({
        defaultHabitView: "list",
        showStreak: true,
        showQuotes: true,
    });

    // Profile form handlers
    const handleProfileChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setProfile(prev => ({
            ...prev,
            email: newEmail
        }));
    };

    const handleTimezoneChange = (value) => {
        setProfile(prev => ({
            ...prev,
            timezone: value
        }));
    };

    const validateProfile = () => {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profile.email)) {
            toast({
                title: "Invalid email",
                description: "Please enter a valid email address.",
                variant: "destructive"
            });
            return false;
        }

        // Name validation
        if (profile.name.trim().length < 2) {
            toast({
                title: "Invalid name",
                description: "Name must be at least 2 characters long.",
                variant: "destructive"
            });
            return false;
        }

        return true;
    };

    const saveSettings = () => {
        if (!validateProfile()) {
            return;
        }
        
        // In a real app, you would send this to your backend
        console.log("Saving profile:", profile);
        console.log("Saving notifications:", notifications);
        console.log("Saving preferences:", preferences);
        
        toast({
            title: "Settings saved!",
            description: "Your preferences have been updated."
        });
    };

    const handleExportData = () => {
        const data = {
            profile,
            notifications,
            preferences,
            exportedAt: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `kaizen-settings-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
            title: "Data exported",
            description: "Your settings have been downloaded as JSON."
        });
    };

    const handleDeleteData = () => {
        if (window.confirm("Are you sure you want to delete all your data? This action cannot be undone.")) {
            // In a real app, this would call an API endpoint
            toast({
                title: "Data deleted",
                description: "All your data has been removed.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto lg:px-20">
            <div className="mb-8 animate-fade-in">
                <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Customize your Kaizen experience</p>
            </div>
            <div className="space-y-6">
                <Card variant="zen" className="animate-slide-up">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Profile</CardTitle>
                                <CardDescription>Your personal information</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground font-display font-bold text-2xl">
                                {profile.name.charAt(0)}
                            </div>
                            <Button variant="outline" size="sm">
                                Change Avatar
                            </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="display-name">Display Name</Label>
                                <Input
                                    id="display-name"
                                    value={profile.name}
                                    onChange={(e) => handleProfileChange("name", e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleEmailChange}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select
                                    value={profile.timezone}
                                    onValueChange={handleTimezoneChange}
                                >
                                    <SelectTrigger id="timezone">
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                                        <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                                        <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                                        <SelectItem value="UTC+1">UTC+1 (Central European)</SelectItem>
                                        <SelectItem value="UTC+5.5">UTC+5.5 (India)</SelectItem>
                                        <SelectItem value="UTC+8">UTC+8 (China)</SelectItem>
                                        <SelectItem value="UTC+9">UTC+9 (Japan)</SelectItem>
                                        <SelectItem value="UTC+10">UTC+10 (Australia Eastern)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="zen" className="animate-slide-up" style={{ animationDelay: "100ms" }}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-accent/10 p-2">
                                <Bell className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Notifications</CardTitle>
                                <CardDescription>Manage your reminders</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Daily Reminder</Label>
                                <p className="text-sm text-muted-foreground">Get reminded to complete habits</p>
                            </div>
                            <Switch
                                checked={notifications.dailyReminder}
                                onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReminder: checked })}
                            />
                        </div>
                        <Separator />

                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Weekly Report</Label>
                                <p className="text-sm text-muted-foreground">Receive weekly progress summary</p>
                            </div>
                            <Switch
                                checked={notifications.weeklyReport}
                                onCheckedChange={(checked) =>
                                    setNotifications({ ...notifications, weeklyReport: checked })
                                }
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Streak Alerts</Label>
                                <p className="text-sm text-muted-foreground">Be notified when streaks are at risk</p>
                            </div>
                            <Switch
                                checked={notifications.streakAlerts}
                                onCheckedChange={(checked) =>
                                    setNotifications({ ...notifications, streakAlerts: checked })
                                }
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Goal Deadlines</Label>
                                <p className="text-sm text-muted-foreground">Reminders for approaching deadlines</p>
                            </div>
                            <Switch
                                checked={notifications.goalDeadlines}
                                onCheckedChange={(checked) =>
                                    setNotifications({ ...notifications, goalDeadlines: checked })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card variant="zen" className="animate-slide-up" style={{ animationDelay: "200ms" }}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-zen-terracotta/10 p-2">
                                <Palette className="h-5 w-5 text-zen-terracotta" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Preferences</CardTitle>
                                <CardDescription>Customize your dashboard</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Show Streak Counter</Label>
                                <p className="text-sm text-muted-foreground">Display streak badges on habits</p>
                            </div>
                            <Switch
                                checked={preferences.showStreak}
                                onCheckedChange={(checked) =>
                                    setPreferences({ ...preferences, showStreak: checked })
                                }
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Show Daily Quotes</Label>
                                <p className="text-sm text-muted-foreground">Display motivational quotes</p>
                            </div>
                            <Switch
                                checked={preferences.showQuotes}
                                onCheckedChange={(checked) =>
                                    setPreferences({ ...preferences, showQuotes: checked })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card variant="zen" className="animate-slide-up" style={{ animationDelay: "300ms" }}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-muted p-2">
                                <Download className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Data</CardTitle>
                                <CardDescription>Export or delete your data</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={handleExportData}
                            >
                                <Download className="h-4 w-4" />
                                Export Data
                            </Button>
                            <Button
                                variant="outline"
                                className="gap-2 text-destructive hover:text-destructive"
                                onClick={handleDeleteData}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete All Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end pt-4">
                    <Button
                        onClick={saveSettings}
                        className="bg-gradient-forest hover:opacity-90 gap-2"
                    >
                        <Save className="h-4 w-4" />
                        Save All Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}