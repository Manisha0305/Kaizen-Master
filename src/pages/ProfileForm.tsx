import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfileForm({ initialProfile = null, onSave = (profile: unknown) => {} }) {
    const { toast } = useToast();
    
    const [profile, setProfile] = useState(initialProfile || {
        name: "Kaizen Master",
        email: "master@kaizen.com",
        timezone: "UTC-5",
        avatarInitial: "K"
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleProfileChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
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

    const handleSave = () => {
        if (!validateProfile()) {
            return;
        }
        
        // Call the onSave callback if provided
        onSave(profile);
        
        setIsEditing(false);
        
        toast({
            title: "Profile updated!",
            description: "Your profile information has been saved."
        });
    };

    const handleCancel = () => {
        if (initialProfile) {
            setProfile(initialProfile);
        }
        setIsEditing(false);
    };

    const timezones = [
        { value: "UTC-5", label: "UTC-5 (Eastern Time)" },
        { value: "UTC-8", label: "UTC-8 (Pacific Time)" },
        { value: "UTC+0", label: "UTC+0 (GMT)" },
        { value: "UTC+1", label: "UTC+1 (Central European)" },
        { value: "UTC+5.5", label: "UTC+5.5 (India)" },
        { value: "UTC+8", label: "UTC+8 (China)" },
        { value: "UTC+9", label: "UTC+9 (Japan)" },
        { value: "UTC+10", label: "UTC+10 (Australia Eastern)" }
    ];

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto lg:px-20">
        <Card variant="zen" className="animate-slide-up">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Profile Information</CardTitle>
                            <CardDescription>Manage your personal details</CardDescription>
                        </div>
                    </div>
                    {!isEditing ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="w-full sm:w-auto mt-2 sm:mt-0"
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancel}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSave}
                                className="bg-gradient-forest hover:opacity-90 w-full sm:w-auto"
                            >
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4">
                    <div className="h-20 w-20 min-w-20 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground font-display font-bold text-3xl">
                        {profile.name.charAt(0)}
                    </div>
                    <div className="space-y-2 w-full">
                        <Label>Avatar</Label>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" disabled={!isEditing} className="flex-1 xs:flex-none">
                                Upload Image
                            </Button>
                            <Button variant="outline" size="sm" disabled={!isEditing} className="flex-1 xs:flex-none">
                                Generate Avatar
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            JPG, PNG or SVG. Max size 2MB
                        </p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Personal Information</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="display-name">Display Name</Label>
                                <Input
                                    id="display-name"
                                    value={profile.name}
                                    onChange={(e) => handleProfileChange("name", e.target.value)}
                                    placeholder="Enter your name"
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-muted/50" : ""}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => handleProfileChange("email", e.target.value)}
                                    placeholder="your@email.com"
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-muted/50" : ""}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Preferences</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select
                                    value={profile.timezone}
                                    onValueChange={(value) => handleProfileChange("timezone", value)}
                                    disabled={!isEditing}
                                >
                                    <SelectTrigger 
                                        id="timezone" 
                                        className={!isEditing ? "bg-muted/50" : ""}
                                    >
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timezones.map((tz) => (
                                            <SelectItem key={tz.value} value={tz.value}>
                                                {tz.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select disabled={!isEditing}>
                                    <SelectTrigger 
                                        id="language"
                                        className={!isEditing ? "bg-muted/50" : ""}
                                    >
                                        <SelectValue placeholder="English" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Español</SelectItem>
                                        <SelectItem value="fr">Français</SelectItem>
                                        <SelectItem value="de">Deutsch</SelectItem>
                                        <SelectItem value="ja">日本語</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info - Only editable when editing */}
                    {isEditing && (
                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="font-semibold text-foreground">Additional Information</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        placeholder="City, Country"
                                        className="bg-background"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        placeholder="Tell us about yourself"
                                        className="bg-background"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    placeholder="https://example.com"
                                    className="bg-background"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
        </div>
    );
}