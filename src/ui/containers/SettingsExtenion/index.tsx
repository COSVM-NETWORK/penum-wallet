import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routesPath } from '../../../utils';
import { Button, ChevronLeftIcon, CloseSvg } from '../../components';

const header = {
  [routesPath.SETTINGS]: 'Settings',
  [routesPath.SETTINGS_ADDITIONALLY]: 'Additionally',
  [routesPath.SETTINGS_CONTACTS]: 'Contact Information',
  [routesPath.SETTINGS_SECURITY_PRIVACY]: 'Security and Privacy',
  [routesPath.SETTINGS_WARNINGS]: 'Warnings',
  [routesPath.SETTINGS_NETWORKS]: 'Networks',
  [routesPath.SETTINGS_GENERAL_INFORMATION]: 'General information',
};


export const SettingsExtenion = () => {
  const navigate = useNavigate();
  const { pathname} = useLocation();

  const handleBack = () => navigate(routesPath.SETTINGS);

  return (
    <div className="min-h-[500px] w-[100%]">
      <div className="h-[100%] w-[calc(100%-80px)] mx-[40px] bg-brown rounded-[15px] pb-[28px]">
        {pathname === routesPath.SETTINGS ? (
          <></>
        ) : (
          <Button
            mode="icon_transparent"
            onClick={handleBack}
            title="Back"
            iconLeft={<ChevronLeftIcon stroke="#E0E0E0" />}
            className="text-[12px] pl-[8px] pt-[22px] pb-[2px]"
          />
        )}
        <div
          className={`pt-[24px] px-[16px] flex justify-between items-center pb-[16px] ${
            pathname !== routesPath.SETTINGS
              ? 'border-b-[1px] border-solid border-dark_grey'
              : ''
          }`}
        >
          <p className="h1_ext">{header[pathname]}</p>
          <CloseSvg width="14" height="14" fill="white" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};