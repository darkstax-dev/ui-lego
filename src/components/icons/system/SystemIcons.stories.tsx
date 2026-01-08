import type { Meta, StoryObj } from '@storybook/react-vite'
import * as SystemIcons from './index'
import '../Icons.stories.css'
import '../../../tokens.css'

const meta: Meta = {
  title: 'Icons/System',
}

export default meta

type Story = StoryObj

const icons: { name: string; Component: React.ComponentType<any> }[] = [
  { name: 'MenuLine', Component: SystemIcons.MenuLine },
  { name: 'CheckLine', Component: SystemIcons.CheckLine },
  { name: 'CloseLine', Component: SystemIcons.CloseLine },
  { name: 'CloseCircleLine', Component: SystemIcons.CloseCircleLine },
  { name: 'ArrowRightFill', Component: SystemIcons.ArrowRightFill },
  { name: 'ArrowLeftFill', Component: SystemIcons.ArrowLeftFill },
  { name: 'ArrowUpFill', Component: SystemIcons.ArrowUpFill },
  { name: 'ArrowDownFill', Component: SystemIcons.ArrowDownFill },
  { name: 'ArrowRightLine', Component: SystemIcons.ArrowRightLine },
  { name: 'ArrowLeftLine', Component: SystemIcons.ArrowLeftLine },
  { name: 'SearchFill', Component: SystemIcons.SearchFill },
  { name: 'SearchLine', Component: SystemIcons.SearchLine },
  { name: 'SettingsFill', Component: SystemIcons.SettingsFill },
  { name: 'EyeLine', Component: SystemIcons.EyeLine },
  { name: 'EyeOffLine', Component: SystemIcons.EyeOffLine },
  { name: 'FolderLine', Component: SystemIcons.FolderLine },
  { name: 'FolderMinus', Component: SystemIcons.FolderMinus },
  { name: 'FolderPlus', Component: SystemIcons.FolderPlus },
  { name: 'UploadFill', Component: SystemIcons.UploadFill },
  { name: 'DownloadLine', Component: SystemIcons.DownloadLine },
  { name: 'DeleteBinLine', Component: SystemIcons.DeleteBinLine },
  { name: 'AddFill', Component: SystemIcons.AddFill },
  { name: 'LockFill', Component: SystemIcons.LockFill },
  { name: 'LockUnlockFill', Component: SystemIcons.LockUnlockFill },
  { name: 'Timer2Line', Component: SystemIcons.Timer2Line },
  { name: 'EditLine', Component: SystemIcons.EditLine },
  { name: 'ShieldLine', Component: SystemIcons.ShieldLine },
  { name: 'Shape2Line', Component: SystemIcons.Shape2Line },
  { name: 'InboxUnarchiveFill', Component: SystemIcons.InboxUnarchiveFill },
  { name: 'PlayCircleLine', Component: SystemIcons.PlayCircleLine },
  { name: 'DeleteBack2Line', Component: SystemIcons.DeleteBack2Line },
  { name: 'DeleteBin7Line', Component: SystemIcons.DeleteBin7Line },
]

export const Catalog: Story = {
  render: () => (
    <div className="icons-catalog" style={{ padding: 'var(--sds-size-space-800)' }}>
      <div className="icons-header">
        <h1 className="heading-page">System Icons</h1>
      </div>
      <div className="icons-grid">
        {icons.map(({ name, Component }) => (
          <div className="icon-item" key={name}>
            <div className="icon-preview" style={{ color: 'var(--text-blue-main)' }}>
              <Component width={24} height={24} fill={'currentColor'} />
            </div>
            <div className="icon-info">
              <h3 className="icon-name body-base-macan-semibold">{name}</h3>
              <span className="icon-category body-small-mono-book">token: var(--text-blue-main)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
