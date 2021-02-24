namespace :prepare do
    task :copy_files do
      next unless any? :copy_files
      on roles :app do
        fetch(:copy_files).each do |path|
          source = shared_path.join(path)
          target = release_path.join(path)
  
          if test "[ -f #{source} ]"
            execute :cp, fetch(:copy_file_flags), source, target
          elsif test "[ -d #{source} ]"
            execute :cp, fetch(:copy_dir_flags), source, target
          else
            warn "#{source} is not a file/dir that can be copied (target: #{target})"
          end
        end
      end
    end
  
    task :updating do
      invoke "prepare:copy_files"
    end

    after "deploy:set_current_revision", "prepare:updating"
end