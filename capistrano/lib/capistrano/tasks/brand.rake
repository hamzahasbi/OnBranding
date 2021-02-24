namespace :branding do
    
    desc 'Online Branding APP deployment Pipeline'
    task :deploy do
        on roles(:app) do
    
            execute :mkdir, "-p ~/databases-backup"
            within release_path.join(fetch(:app_path)) do
            info "Backup Database"
            #execute :drush, "sql-dump > ~/databases-backup/db-#{Time.now.strftime("%m-%d-%Y--%H-%M-%S")}.sql"
            end
        end
    end
  
    desc 'Stopping old Containers'
    task :clean_containers do
        on roles(:app) do
            within release_path.join(fetch(:app_path)) do
                invoke "docker:compose:stop"
            end
        end
    end

    desc 'Set permissions on old releases before cleanup'
    task :cleanup_settings_permission do
        on release_roles :all do |host|
        releases = capture(:ls, "-x", releases_path).split
        valid, invalid = releases.partition { |e| /^\d{14}$/ =~ e }
 
        warn t(:skip_cleanup, host: host.to_s) if invalid.any?
 
        if valid.count >= fetch(:keep_releases)
          info t(:keeping_releases, host: host.to_s, keep_releases: fetch(:keep_releases), releases: valid.count)
          directories = (valid - valid.last(fetch(:keep_releases))).map do |release|
            releases_path.join(release).to_s
          end
          if test("[ -d #{current_path} ]")
            current_release = capture(:readlink, current_path).to_s
            if directories.include?(current_release)
              warn t(:wont_delete_current_release, host: host.to_s)
              directories.delete(current_release)
            end
          else
            debug t(:no_current_release, host: host.to_s)
          end
          if directories.any?
            directories.each  do |dir_str|
              execute :chmod, "-R 777", dir_str
            end
          else
            info t(:no_old_releases, host: host.to_s, keep_releases: fetch(:keep_releases))
          end
        end
      end
    end

    before 'docker:deploy:compose:start', 'branding:clean_containers'
    before 'deploy:finishing', 'branding:cleanup_settings_permission'

end