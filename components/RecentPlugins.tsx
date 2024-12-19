import { getRecentPlugins } from "@/lib/dataUtils";
import PluginTile from "@/components/PluginTile";
import { PluginMeta } from "@/types";
import { FC } from "react";

const RecentPlugins: FC<{ num: number }> = ({ num = 4 }) => {
  const pluginData: PluginMeta[] = getRecentPlugins(num)

  return (
    <div className="">
      <h2 id='recent-updates' className="text-highlight2 mb-8">Recent Updates</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,_1fr))] gap-8">
        {pluginData.map((plugin) => {
          return <PluginTile key={plugin.key} plugin={plugin} mode="mini" className="min-w-[20rem] max-w-[40rem] shadow-md" />
        })}
      </div>
    </div>
  )
}

export default RecentPlugins