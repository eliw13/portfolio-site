"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import { GlassSurface } from "@/components";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          {/* Desktop: Glass Surface */}
          <Row s={{ hide: true }} fillWidth horizontal="center">
            <GlassSurface
              width="fit-content"
              height={56}
              borderRadius={16}
              brightness={60}
              opacity={0.85}
              blur={14}
              displace={2}
              backgroundOpacity={0.15}
              saturation={1.4}
              distortionScale={-160}
              redOffset={2}
              greenOffset={8}
              blueOffset={14}
              style={{ padding: 0, minWidth: 'fit-content' }}
            >
              <Row
                padding="4"
                paddingX="8"
                horizontal="center"
                zIndex={1}
                style={{ background: 'transparent' }}
              >
                <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning wrap={false}>
                  {routes["/"] && (
                    <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
                  )}
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  {routes["/about"] && (
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === "/about"}
                    />
                  )}
                  {routes["/work"] && (
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  )}
                  {routes["/blog"] && (
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  )}
                  {routes["/gallery"] && (
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      label={gallery.label}
                      selected={pathname.startsWith("/gallery")}
                    />
                  )}
                  {display.themeSwitcher && (
                    <>
                      <Line background="neutral-alpha-medium" vert maxHeight="24" />
                      <ThemeToggle />
                    </>
                  )}
                </Row>
              </Row>
            </GlassSurface>
          </Row>

          {/* Mobile: Glass Surface with Icons Only */}
          <Row hide s={{ hide: false }} fillWidth horizontal="center">
            <GlassSurface
              width="fit-content"
              height={56}
              borderRadius={16}
              brightness={60}
              opacity={0.85}
              blur={14}
              displace={2}
              backgroundOpacity={0.15}
              saturation={1.4}
              distortionScale={-160}
              redOffset={2}
              greenOffset={8}
              blueOffset={14}
              style={{ padding: 0, minWidth: 'fit-content' }}
            >
              <Row
                padding="8"
                horizontal="center"
                zIndex={1}
                style={{ background: 'transparent', minWidth: 'fit-content' }}
              >
                <Row gap="8" vertical="center" textVariant="body-default-s" suppressHydrationWarning wrap={false}>
                  {routes["/"] && (
                    <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
                  )}
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  {routes["/about"] && (
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  )}
                  {routes["/work"] && (
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  )}
                  {routes["/blog"] && (
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  )}
                  {routes["/gallery"] && (
                    <ToggleButton
                      prefixIcon="gallery"
                      href="/gallery"
                      selected={pathname.startsWith("/gallery")}
                    />
                  )}
                  {display.themeSwitcher && (
                    <>
                      <Line background="neutral-alpha-medium" vert maxHeight="24" />
                      <ThemeToggle />
                    </>
                  )}
                </Row>
              </Row>
            </GlassSurface>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
