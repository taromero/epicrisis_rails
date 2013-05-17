require 'capybara/rspec'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

RSpec.configure do |config|

  config.use_transactional_fixtures = false
  
  config.before(:suite) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

end

describe "Infeccion" do

  context "show", :js => true do
    before(:each) do
      @epicrisis = create(:epicrisis, infeccion: create(:infeccion, ascitis: create(:ascitis)))
      @infeccion = @epicrisis.infeccion
      visit "/#/epicrisis/" + @epicrisis.id.to_s
    end

    it "should display all the project's resources names" do
      @infeccion.nombre.should_not eq nil
      find('input.nombre').value.should eq @infeccion.nombre
    end
    # context "update", :js => true do

    # end
  end

end