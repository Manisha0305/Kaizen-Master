import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Download, ChevronLeft, ChevronRight, History, Activity, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HistoryTable() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Sample history data
    const [historyData, setHistoryData] = useState([
        { id: 1, date: "2024-01-15", activity: "Morning Meditation", type: "meditation", duration: "15 min", status: "completed", streak: 7 },
        { id: 2, date: "2024-01-15", activity: "Workout Session", type: "exercise", duration: "45 min", status: "completed", streak: 5 },
        { id: 3, date: "2024-01-14", activity: "Journal Entry", type: "journal", duration: "10 min", status: "completed", streak: 14 },
        { id: 4, date: "2024-01-14", activity: "Reading Time", type: "reading", duration: "30 min", status: "skipped", streak: 0 },
        { id: 5, date: "2024-01-13", activity: "Water Intake Goal", type: "health", duration: "Daily", status: "completed", streak: 21 },
        { id: 6, date: "2024-01-13", activity: "Language Practice", type: "learning", duration: "20 min", status: "completed", streak: 12 },
        { id: 7, date: "2024-01-12", activity: "Morning Meditation", type: "meditation", duration: "15 min", status: "completed", streak: 6 },
        { id: 8, date: "2024-01-12", activity: "Workout Session", type: "exercise", duration: "30 min", status: "completed", streak: 4 },
        { id: 9, date: "2024-01-11", activity: "Coding Practice", type: "learning", duration: "60 min", status: "completed", streak: 8 },
        { id: 10, date: "2024-01-11", activity: "Evening Walk", type: "exercise", duration: "25 min", status: "completed", streak: 9 },
        { id: 11, date: "2024-01-10", activity: "Meditation", type: "meditation", duration: "20 min", status: "completed", streak: 5 },
        { id: 12, date: "2024-01-10", activity: "Reading Time", type: "reading", duration: "40 min", status: "completed", streak: 3 },
    ]);

    // Filter and search history data
    const filteredData = historyData.filter(item => {
        const matchesSearch = item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === "all" || item.type === filterType;
        return matchesSearch && matchesFilter;
    });

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return "bg-gradient-forest text-primary-foreground";
            case "skipped": return "bg-zen-terracotta/20 text-zen-terracotta";
            case "incomplete": return "bg-muted text-muted-foreground";
            default: return "bg-muted text-muted-foreground";
        }
    };

    // Type badge color
    const getTypeColor = (type) => {
        switch (type) {
            case "meditation": return "bg-blue-500/10 text-blue-500";
            case "exercise": return "bg-green-500/10 text-green-500";
            case "journal": return "bg-purple-500/10 text-purple-500";
            case "reading": return "bg-amber-500/10 text-amber-500";
            case "health": return "bg-rose-500/10 text-rose-500";
            case "learning": return "bg-indigo-500/10 text-indigo-500";
            default: return "bg-muted text-muted-foreground";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleExportHistory = () => {
        const exportData = filteredData.map(item => ({
            Date: item.date,
            Activity: item.activity,
            Type: item.type,
            Duration: item.duration,
            Status: item.status,
            Streak: item.streak
        }));

        const csvContent = [
            ["Date", "Activity", "Type", "Duration", "Status", "Streak"],
            ...exportData.map(item => [
                item.Date,
                item.Activity,
                item.Type,
                item.Duration,
                item.Status,
                item.Streak
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `kaizen-history-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast({
            title: "History exported!",
            description: "Your activity history has been downloaded as CSV."
        });
    };

    const handleClearHistory = () => {
        if (window.confirm("Are you sure you want to clear all history? This action cannot be undone.")) {
            setHistoryData([]);
            toast({
                title: "History cleared",
                description: "All activity history has been removed.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto lg:px-20">
        <Card variant="zen" className="animate-slide-up">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-gradient-forest/10 p-2">
                            <History className="h-5 w-5 text-gradient-forest" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Activity History</CardTitle>
                            <CardDescription>Track your habit completion history</CardDescription>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 flex-1 sm:flex-none min-w-[120px]"
                            onClick={handleExportHistory}
                        >
                            <Download className="h-4 w-4" />
                            <span className="hidden xs:inline">Export</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-destructive hover:text-destructive flex-1 sm:flex-none min-w-[120px]"
                            onClick={handleClearHistory}
                        >
                            Clear All
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search activities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="flex-1 min-w-[140px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="meditation">Meditation</SelectItem>
                                <SelectItem value="exercise">Exercise</SelectItem>
                                <SelectItem value="journal">Journal</SelectItem>
                                <SelectItem value="reading">Reading</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="learning">Learning</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="flex-1 min-w-[140px]">
                                <Calendar className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Last 30 days" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Last 7 days</SelectItem>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 90 days</SelectItem>
                                <SelectItem value="365">Last year</SelectItem>
                                <SelectItem value="all">All time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <div className="bg-gradient-forest/5 rounded-lg p-3 sm:p-4 border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Total Activities</p>
                                <p className="text-xl sm:text-2xl font-bold text-foreground">{filteredData.length}</p>
                            </div>
                            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-gradient-forest" />
                        </div>
                    </div>
                    <div className="bg-gradient-forest/5 rounded-lg p-3 sm:p-4 border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Completion Rate</p>
                                <p className="text-xl sm:text-2xl font-bold text-foreground">
                                    {filteredData.length > 0 
                                        ? Math.round((filteredData.filter(item => item.status === "completed").length / filteredData.length) * 100)
                                        : 0}%
                                </p>
                            </div>
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground text-sm">
                                ✓
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-forest/5 rounded-lg p-3 sm:p-4 border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Current Streak</p>
                                <p className="text-xl sm:text-2xl font-bold text-foreground">
                                    {Math.max(...historyData.map(item => item.streak), 0)}
                                </p>
                            </div>
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-forest flex items-center justify-center text-primary-foreground text-sm">
                                🔥
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-forest/5 rounded-lg p-3 sm:p-4 border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Avg. Duration</p>
                                <p className="text-xl sm:text-2xl font-bold text-foreground">
                                    {filteredData.length > 0 
                                        ? Math.round(filteredData
                                            .filter(item => !isNaN(parseInt(item.duration)))
                                            .reduce((acc, item) => acc + parseInt(item.duration), 0) / 
                                            filteredData.filter(item => !isNaN(parseInt(item.duration))).length)
                                        : 0} min
                                </p>
                            </div>
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gradient-forest" />
                        </div>
                    </div>
                </div>

                {/* History Table */}
                <div className="rounded-lg border overflow-x-auto">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap">Date</TableHead>
                                <TableHead className="whitespace-nowrap">Activity</TableHead>
                                <TableHead className="whitespace-nowrap">Type</TableHead>
                                <TableHead className="whitespace-nowrap">Duration</TableHead>
                                <TableHead className="whitespace-nowrap">Status</TableHead>
                                <TableHead className="whitespace-nowrap">Streak</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/50">
                                        <TableCell className="font-medium whitespace-nowrap">
                                            {formatDate(item.date)}
                                        </TableCell>
                                        <TableCell className="min-w-[150px] max-w-[200px] truncate">
                                            {item.activity}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getTypeColor(item.type) + " whitespace-nowrap"}>
                                                <span className="hidden xs:inline">{item.type}</span>
                                                <span className="xs:hidden">{item.type.charAt(0).toUpperCase()}</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {item.duration}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(item.status) + " whitespace-nowrap"}>
                                                <span className="hidden sm:inline">
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </span>
                                                <span className="sm:hidden">
                                                    {item.status.charAt(0).toUpperCase()}
                                                </span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 whitespace-nowrap">
                                                <span className="font-semibold">{item.streak}</span>
                                                {item.streak > 0 && (
                                                    <span className="text-amber-500">🔥</span>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <History className="h-10 w-10 sm:h-12 sm:w-12 opacity-20" />
                                            <p>No activity history found</p>
                                            {searchQuery && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSearchQuery("")}
                                                >
                                                    Clear search
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                        <div className="text-sm text-muted-foreground text-center sm:text-left">
                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} activities
                        </div>
                        <div className="flex flex-col xs:flex-row items-center gap-3">
                            <div className="flex items-center gap-1 order-2 xs:order-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className="h-8 w-8 p-0 hidden sm:flex"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="h-8 px-2"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="hidden xs:inline ml-1">Previous</span>
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 2) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 1) {
                                            pageNum = totalPages - 2 + i;
                                        } else {
                                            pageNum = currentPage - 1 + i;
                                        }
                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? "default" : "outline"}
                                                size="sm"
                                                className={`h-8 px-3 ${currentPage === pageNum ? 'bg-gradient-forest' : ''}`}
                                                onClick={() => setCurrentPage(pageNum)}
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="h-8 px-2"
                                >
                                    <span className="hidden xs:inline mr-1">Next</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="h-8 w-8 p-0 hidden sm:flex"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="order-1 xs:order-2">
                                <Select value={currentPage.toString()} onValueChange={(value) => setCurrentPage(parseInt(value))}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <SelectItem key={page} value={page.toString()}>
                                                Page {page}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
        </div>
    );
}