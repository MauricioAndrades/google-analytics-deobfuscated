# Analytics.js - Deobfuscated Version

## Overview

This repository contains a deobfuscated version of the `analytics.js` script. Used to explore and understand
the inner workings of google analytics and ga tracking.

- `analytics.js`: deobfuscated version
- `analytics.min.js`: original version served by google
- `analytics.ts`: wip typed version

## Features

- **Namespace Registration:** Handles the registration of global namespaces within the script's scope.
- **Base64 Decoding:** Provides functionality to decode Base64 encoded strings using a custom character set.
- **Event Tagging:** Implements mechanisms to tag and track events within the application.
- **Shared Data Management:** Manages shared data across different parts of the application using a centralized data structure.
- **URL Manipulation:** Includes various functions for manipulating and processing URLs, including handling query parameters and fragments.
- **Form and Link Processing:** Automatically decorates URLs and form actions with tracking parameters.
- **Client ID Management:** Manages client identifiers and session tracking, including integration with AMP client IDs.
- **Data Transmission:** Sends collected data to analytics endpoints using various methods such as image beacons, XHR, or the Beacon API.
- **Cookie Management:** Provides utilities for setting, getting, and managing cookies within the application.
- **Custom Tasks:** Supports adding custom tasks and properties to be used within the analytics workflow.
