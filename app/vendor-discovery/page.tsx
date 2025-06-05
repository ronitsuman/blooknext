import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, Star, MapPin, Truck, Clock, CheckCircle } from "lucide-react"

export default function VendorDiscoveryPage() {
  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Vendor Discovery</h1>
        <p className="text-muted-foreground text-lg">
          Find the perfect vendors for your advertising and marketing needs
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Service Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="printing">Printing</SelectItem>
                    <SelectItem value="fabrication">Fabrication</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="digital">Digital Marketing</SelectItem>
                    <SelectItem value="design">Graphic Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">City</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars & Above</SelectItem>
                    <SelectItem value="4">4 Stars & Above</SelectItem>
                    <SelectItem value="3">3 Stars & Above</SelectItem>
                    <SelectItem value="2">2 Stars & Above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Delivery Available</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Experience</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5+">5+ Years</SelectItem>
                    <SelectItem value="3+">3+ Years</SelectItem>
                    <SelectItem value="1+">1+ Years</SelectItem>
                    <SelectItem value="any">Any Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Search Bar */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search vendors by name, service or location..." className="pl-8" />
            </div>
            <Button>Search</Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="printing">Printing</TabsTrigger>
              <TabsTrigger value="fabrication">Fabrication</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Results */}
          <div className="space-y-4">
            {/* Vendor Card 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    <div className="bg-gray-100 rounded-md h-32 w-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">Logo</span>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">PrintMaster Solutions</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-2 text-sm text-muted-foreground">(48 reviews)</span>
                        </div>
                      </div>
                      <Badge>Verified</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">Printing</Badge>
                      <Badge variant="outline">Banners</Badge>
                      <Badge variant="outline">Signage</Badge>
                      <Badge variant="outline">Brochures</Badge>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Mumbai, Maharashtra</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Delivery Available</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Avg. Turnaround: 3-5 days</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>7+ Years Experience</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button>View Profile</Button>
                      <Button variant="outline">Contact</Button>
                      <Button variant="outline">Request Quote</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Card 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    <div className="bg-gray-100 rounded-md h-32 w-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">Logo</span>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">Creative Fabricators</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 text-gray-300" />
                          <span className="ml-2 text-sm text-muted-foreground">(32 reviews)</span>
                        </div>
                      </div>
                      <Badge>Verified</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">Fabrication</Badge>
                      <Badge variant="outline">Standees</Badge>
                      <Badge variant="outline">Displays</Badge>
                      <Badge variant="outline">Booths</Badge>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Delhi, NCR</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Delivery Available</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Avg. Turnaround: 7-10 days</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>5+ Years Experience</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button>View Profile</Button>
                      <Button variant="outline">Contact</Button>
                      <Button variant="outline">Request Quote</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Card 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    <div className="bg-gray-100 rounded-md h-32 w-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">Logo</span>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">InstallPro Services</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-2 text-sm text-muted-foreground">(56 reviews)</span>
                        </div>
                      </div>
                      <Badge>Verified</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">Installation</Badge>
                      <Badge variant="outline">Signage</Badge>
                      <Badge variant="outline">Hoardings</Badge>
                      <Badge variant="outline">Kiosks</Badge>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Bangalore, Karnataka</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>On-site Service</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Avg. Turnaround: 1-2 days</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>10+ Years Experience</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button>View Profile</Button>
                      <Button variant="outline">Contact</Button>
                      <Button variant="outline">Request Quote</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
