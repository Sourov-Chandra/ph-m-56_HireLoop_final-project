
import {LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Create a Job",
    },
    {
      icon: FaBriefcase,
      href: "/dashboard/recruiter/jobs/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/", label: "Messages" },
    { icon: Person, href: "/", label: "Profile" },
    { icon: Gear, href: "/", label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Sidebar: hidden on mobile, visible on lg+ */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-default p-4">
        {navContent}
      </aside>

      {/* Button: visible on mobile, hidden on lg+ */}
      <Drawer>
        <Button className="md:hidden" variant="secondary">
          <LayoutSideContentLeft />
          SideBar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}