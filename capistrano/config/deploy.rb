# config valid only for current version of Capistrano

set :application, "online_branding_app"
set :repo_url, "git@github.com:hamzahasbi/OnBranding.git"
set :tmp_dir, '/home/onbranding/tmp'


set :copy_files, fetch(:copy_files, []).push('.env')
set :copy_files, fetch(:copy_files, []).push('backend/config/default.json')
set :copy_files, fetch(:copy_files, []).push('branding.conf')
set :copy_file_flags, ""
set :copy_dir_flags, "-R"

set :docker_compose, -> {true}
set :docker_compose_path, -> {"docker-compose.yml"}
set :docker_compose_remove_after_stop, -> {true}
set :docker_compose_project_name, -> {"onbranding"}
set :docker_compose_remove_volumes, -> {false}
set :app_path, '.'



# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/onbranding/"
set :current_directory, 'www'

set :keep_releases, 1
# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :default_env, { path: "$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5
