# frozen_string_literal: true

changelog_file_contains_ticket_number = !`grep -Er "^([A-Z]*)\-" tools/changelog/`.empty?
new_line_missing_at_the_end_of_a_file = !`find tools/changelog/ -type f | xargs tail -c 1 | grep -v -e '^$' | grep -B1 -v -e '^==> '`.empty?

unless gitlab.mr_title.include?('WIP: ') || gitlab.mr_title.include?('Draft: ')
  unless /^([A-Z])+(\-([0-9])*)? .+$/.match?(gitlab.mr_title)
    warn('Your PR title format should contain the JIRA ticket reference (`PLUS-555 Fix something`) or be labelled as miscellaneous (`MISC Changed something`)')
  end
end

fail('Your changelog file should not contain the JIRA ticket number') if changelog_file_contains_ticket_number

warn('This PR is big, please consider splitting it up next time') if git.lines_of_code > 1000

unless gitlab.mr_json['source_branch'].include?('release/') || gitlab.mr_json['source_branch'].include?('expedite/')
  changelog = git.diff_for_file('CHANGELOG.md')
  if changelog
    fail('You should not modify the CHANGELOG outside of release or expedite branches')
  end
end

unless gitlab.mr_title.include?('MISC')
  added_changelogs = git.added_files.grep(/.*tools\/changelog\//).reject do |added_changelog|
    return git.diff_for_file(added_changelog)
  end
  if added_changelogs.empty?
    warn('You have not added a changelog file for this branch, maybe you need one?')
  end
end

unless gitlab.mr_json['force_remove_source_branch']
  warn('Remember to delete the branch after merging this MR.')
end

unless gitlab.mr_json['squash']
  fail('All merge requests should have their commits squashed when merging. Remember to check the "Squash commits" checkbox. You can do this by editing the Merge Request (Edit button top right). Once saved, re-run Danger by clicking the Red X next to the Pipeline, then click the retry button next to the danger task.')
end

if git.commits.length == 1 && !/^(([A-Z])+(-([0-9])+)?|MISC|Revert)(:|\s).+$/.match?(git.commits[0].message)
  fail('As your merge request contains a single commit, your commit message prefix is invalid. It should match either the JIRA parent ticket reference (e.g. `PLUS-555 Fix something`) or be `MISC Fix something`')
end

git.added_files.grep(/.*contentful-scripts\/migration\/script\/\d+/).each do |added_migration|
  Dir['./contentful-scripts/migration/script/*'].each do |existing_migrations|
    if (existing_migrations[2..-1] != added_migration)
      existing_migrations.match(/.*contentful-scripts\/migration\/script\/\d+/) do |m|
        if (added_migration[0..39] == m[0][2..-1])
          fail('There is a conflicting migration in Contentful scripts: ' + added_migration)
        end
      end
    end
  end
end

random_lgtm = format('https://media.giphy.com/media/%s/giphy.gif', %w[7TtvTUMm9mp20 YoB1eEFB6FZ1m aLdiZJmmx4OVW 4Z3DdOZRTcXPa].sample)
lgtm.check_lgtm image_url: random_lgtm, https_image_only: true

