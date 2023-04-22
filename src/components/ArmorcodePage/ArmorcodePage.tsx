import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableColumn,
  Progress,
  EmptyState,
  MissingAnnotationEmptyState,
} from '@backstage/core-components';
import Alert from '@material-ui/lab/Alert';
import useAsync from 'react-use/lib/useAsync';
import LaunchSharp from '@material-ui/icons/LaunchSharp';
import { useApi } from '@backstage/core-plugin-api';
import { Link } from '@backstage/core-components';

import { Chip } from '@material-ui/core';

import { armorcodeApiRef } from '../../api';
import {
  ARMORCODE_PRODUCT_ANNOTATION,
  isArmorcodeAvailable
} from '../../utils/commonUtil';

const useStyles = makeStyles(theme => ({
  chipLabel: {
    color: theme.palette.common.white,
  },
  chipHigh: {
    margin: 0,
    backgroundColor: '#5a100c',
  },
  chipCritical: {
    margin: 0,
    backgroundColor: '#9c251f',
  },
  chipMedium: {
    margin: 0,
    backgroundColor: '#e78c87',
  },
  chipLow: {
    backgroundColor: theme.palette.grey[500],
  },
  chipNone: {
    backgroundColor: theme.palette.grey[300],
  },
}));

type DenseTableProps = {
  productList: any[];
};

export const DenseTable = ({ productList }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'ID', field: 'id' },
    { title: 'Product Name', field: 'name' },
    { title: 'Component Version', field: 'versionNumber' },
    { title: 'Description', field: 'description' },
    { title: 'Team', field: 'team' },
    { title: 'Link', field: 'link' },
  ];

  const data = productList.map(item => {
    let gateColor;

    switch (item.vulnerabilityWithRemediation.severity) {
      case 'CRITICAL': {
        gateColor = classes.chipCritical;
        break;
      }
      case 'HIGH': {
        gateColor = classes.chipHigh;
        break;
      }
      case 'MEDIUM': {
        gateColor = classes.chipMedium;
        break;
      }
      case 'LOW': {
        gateColor = classes.chipLow;
        break;
      }
      default: {
        gateColor = classes.chipNone;
        break;
      }
    }

    return {
      id: item.id,
      name: item.name,
      versionNumber: item.versionNumber,
      description: item.description,
      team: item.team.name,
      // severity: (
      //   <Chip
      //     label={item.vulnerabilityWithRemediation.severity}
      //     classes={{ root: gateColor, label: classes.chipLabel }}
      //   />
      // ),
      link: (
        <Link to={item.id}>
          {' '}
          <LaunchSharp />{' '}
        </Link>
      ),
    };
  });

  return (
    <Table
      title="Critical Findings"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const PageContent = () => {
  const armorcodeApi = useApi(armorcodeApiRef);
  const { value, loading, error } = useAsync(async () => {
    const data: any = await armorcodeApi.getProducts();
    return data;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (!value) {
    return (
      <EmptyState
        missing="info"
        title="No information to display"
        description="There are no Armorcode Products!"
      />
    );
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return <DenseTable productList={value || []} />;
}

export const ArmorcodePageComponent = () => {
  return <PageContent />
};
