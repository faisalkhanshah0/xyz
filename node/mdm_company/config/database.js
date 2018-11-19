module.exports = {
  fcmatdb: {
    user: 'apps',
    password: 'options4u',
    connectString: 'ngzcmadb04-dev.corp.netapp.com:10510/FCMAT',
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  },
  teimdb: {
    user: 'EIM_APPS',
    password: 'ApsEa1m$',
    connectString:'raceim01t-scan.corp.netapp.com:7020/TEIM_SAP',
    poolMin: 10,
    poolMax: 10,
	poolIncrement: 0
  }
};
