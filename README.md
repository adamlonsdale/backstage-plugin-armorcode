# backstage-plugin-armorcode

Welcome to the `backstage-plugin-armorcode` plugin for Backstage!

## Getting started

### Example Renders

Overview Page - Armorcode Vulnerability Chart - (Example image here when ready)

Service Entry Page - Armorcode Vulnerabilities List - Example image here when ready)

### Prerequisites

Please ensure the following steps have been undertaken and installed prior to this plugin configuration.

#### Armorcode Backend

You need to install and configure the [Armorcode Backend Plugin](https://github.com/adamlonsdale/backstage-plugin-armorcode-backend) before configuring the frontend.

## Installation

First add the relevant packages to your existing installation of Backstage

```bash
# From your Backstage root directory
yarn add --cwd packages/app @adamlonsdale/backstage-plugin-armorcode
```

`Note: You have 2 Options, you can setup both too`

### Vulnerability Chart Overview (Optional)

Add the Armorcode Vulnerability chart into your entity overview page

Import the plugin to `packages/app/src/components/catalog/EntityPage.tsx`.

#### EntityPage.tsx

```typescript
import { ArmorcodeCard } from '@adamlonsdale/backstage-plugin-armorcode';

// ...

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={6}>
      <EntityAboutCard variant="gridItem" />
    </Grid>
    
    // ...
    
    <Grid item md={4} xs={12}>
      <ArmorcodeCard />
    </Grid>

    // ...

    <Grid item md={8} xs={12}>
      <EntityHasSubcomponentsCard variant="gridItem" />
    </Grid>    
  </Grid>
);
```

### Vulnerabilities List (Optional)

Add the Armorcode Vulnerabilities List into the Service Entity page.

Import the plugin to `packages/app/src/components/catalog/EntityPage.tsx`

#### EntityPage.tsx

```typescript
// ...
import { ArmorcodePage } from '@adamlonsdale/backstage-plugin-armorcode';
// ...
const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    // ...

    <EntityLayout.Route path="/armorcode" title="Armorcode">      
      <ArmorcodePage />    
    </EntityLayout.Route>

    // ...

  </EntityLayout>
);
```

> Note: It is possible to hide the Armorcode service entity tab for those projects without Armorcode configured in the catalog-info.yaml

```typescript
import { ArmorcodePage, isArmorcodeAvailable } from '@adamlonsdale/backstage-plugin-armorcode';

// ...

<EntityLayout.Route if={isArmorcodeAvailable} path="/armorcode" title="Armorcode">      
  <ArmorcodePage />    
</EntityLayout.Route>

```

## Configuration

Add the following into your `app-config.yaml`

### Config

```yaml
armorcode:
  host: https://app.armorcode.com
  token: YOUR_API_TOKEN
```

Add the following into your catalog-info.yaml

### Catalog

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: backstage
  annotations:
    armorcode/project: YOUR_PROJECT_NAME/YOUR_PROJECT_VERSION
```
