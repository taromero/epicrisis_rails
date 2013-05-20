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

    it "should update ascitis exclusive properties" do
      find(:css, 'input[ng-model="infeccion.ascitis.gasa"]').set(true)
      # fill_in 'input[ng-model="infeccion.ascitis.gasa"]', with: true
      # find('input[ng-model="infeccion.ascitis.proteinas_totales"]').value(2.5)
      find('#guardar').click()
      Ascitis.first.gasa.should eq true
    end
    # context "update", :js => true do

    # end
  end

end